const k8s = require('@kubernetes/client-node');

const kubeConfig = new k8s.KubeConfig();

// Load default context
kubeConfig.loadFromDefault();

// kubectl config get-contexts
const kubeContexts = kubeConfig.getContexts();

// kubectl config current-context
const currentContext = kubeConfig.getCurrentContext();

const apiClient = kubeConfig.makeApiClient(k8s.CoreV1Api);

(async () => {
  // kubectl get namespace
  const namespacesResponse = await apiClient.listNamespace();
  const namespaces = namespacesResponse.body.items.map(n => n.metadata.name);

  // kubectl get pods -n default
  const chosenNameSpace = 'default';
  const podsResponse = await apiClient.listNamespacedPod(chosenNameSpace);
  const podsInNamespace = podsResponse.body.items.map(p => p.metadata.name);

  const chosenPodName = podsResponse.body.items[0];
  const container = chosenPodName.spec.containers[0];

  const podName = chosenPodName.metadata.name;
  const containerName = container.name;

  // This will not work : https://github.com/kubernetes-client/javascript/issues/551#issuecomment-725781047
  // const execResult = await apiClient.connectGetNamespacedPodAttach(
  //   podName,
  //   chosenNameSpace,
  //   // containerName,
  // ).catch(e => {
  //   console.error('Failed to connect with pod : ', e.response.body);
  // });

  // Exec using current context
  const exec = new k8s.Exec(kubeConfig);
  const command = "sh";

  // With standard stream
  // const connection = await exec.exec(chosenNameSpace, podName, containerName, command,
  //   process.stdout,
  //   process.stderr,
  //   process.stdin,
  //   true /* tty */,
  //   (status) => {
  //     console.log('Exited with status:');
  //     console.log(JSON.stringify(status, null, 2));
  //   });

  // With file streams
  const fs = require('fs');
  const Stream = require('stream');
  const Readable = Stream.Readable;
  const Writable = Stream.Writable;


  const inStream = new Readable({
    objectMode: true,
    read(){
      console.log("reading");
    }
  });

  const outStream = fs.createWriteStream('out-file.txt');
  const errorStream = fs.createWriteStream('error-file.txt');
  // inStream.setEncoding('utf8');

  const connection = await exec.exec(chosenNameSpace, podName, containerName, 'sh',
    outStream,
    errorStream,
    inStream,
    true /* tty */,
    (status) => {
      console.log('Exited with status:');
      console.log(JSON.stringify(status, null, 2));
      connection.close();
      connection.terminate();
    });

  console.log("connection created");

  inStream.push("ls\n");
  await new Promise(resolve => setTimeout(resolve, 1000));

  inStream.push("exit\n");
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("exited");

  connection.onopen(e => {
    console.log("opened", e)
  });
  // connection.onclose(e => {
  //   console.log("closed", e)
  // });
  connection.onmessage(e => {
    console.log("message received", e)
  });

  // console.log({kubeContexts, currentContext, namespaces, chosenNameSpace, podsInNamespace, chosenPodName, container });
})();
