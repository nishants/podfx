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

  const connection = await exec.exec(chosenNameSpace, podName, containerName, command,
    process.stdout,
    process.stderr,
    process.stdin,
    true /* tty */,
    (status) => {
      console.log('Exited with status:');
      console.log(JSON.stringify(status, null, 2));
    });

  console.log({kubeContexts, currentContext, namespaces, chosenNameSpace, podsInNamespace, chosenPodName, container });
})();
