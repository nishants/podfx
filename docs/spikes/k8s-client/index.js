const k8s = require('@kubernetes/client-node');

const kubeConfig = new k8s.KubeConfig();

// Load default context
kubeConfig.loadFromDefault();

// kubectl config get-contexts
const kubeContexts = kubeConfig.getContexts();

// kubectl config current-context
const currentContext = kubeConfig.getCurrentContext();

const selectedCluster = 'minikube';
kubeConfig.setCurrentContext(selectedCluster);

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
  const {getFiles} = require('./lib/ls');
  const files = await getFiles(kubeConfig, chosenNameSpace, podName, containerName, '/');
  console.log({files});
  // console.log({kubeContexts, currentContext, namespaces, chosenNameSpace, podsInNamespace, chosenPodName, container });
})();
