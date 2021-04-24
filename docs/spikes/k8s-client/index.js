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

  const exec = new k8s.Exec(kubeConfig);
  const Stream = require('stream');
  const Readable = Stream.Readable;
  const Writable = Stream.Writable;
  const output = [];
  const errors = [];

  const inStream = new Readable({
    objectMode: true,
    read(){}
  });

  const outStream = new Writable({
    objectMode: true,
    write(data, _, done){
      const utf8 = data.toString('utf-8');
      output.push(utf8);
      done();
    }
  });

  const errorStream = new Writable({
    objectMode: true,
    write(data, _, done){
      const utf8 = data.toString('utf-8');
      errors.push(utf8);
      done();
    }
  });

  const connection = await exec.exec(chosenNameSpace, podName, containerName, 'bash',
    outStream,
    errorStream,
    inStream,
    true /* tty */,
    (status) => {
      console.log('Exited with status:');
      console.log(JSON.stringify(status, null, 2));
      console.log({output, errors});
      connection.close();
      connection.terminate();
    });

  inStream.push("ls -a #end\n");
  inStream.push("exit #end\n");
   // console.log({kubeContexts, currentContext, namespaces, chosenNameSpace, podsInNamespace, chosenPodName, container });
})();
