const k8s = require('@kubernetes/client-node');
const contexts = {};
const apiClients = {};

const loadContext = (path = null) => {
  const kubeConfig = new k8s.KubeConfig();
  const name = path || "default";

  if(path === null){
    kubeConfig.loadFromDefault();
  } else{
    kubeConfig.loadFromFile(path);
  }
  contexts[name] = kubeConfig;

  return {
    name,
    clusters: contexts[name].getContexts()
  };
};

const getApiClient = (kubeContextName, clusterName) => {
  const apicClientName = `${kubeContextName}-${clusterName}`;
  if(!apiClients[apicClientName]){
    apiClients[apicClientName] = contexts[kubeContextName].makeApiClient(k8s.CoreV1Api);
  }
  return apiClients[apicClientName];
}

const getNameSpaces = async (kubeContextName, clusterName)=> {
  contexts[kubeContextName].setCurrentContext(clusterName);
  const namespacesResponse = await getApiClient(kubeContextName, clusterName).listNamespace();
  const namespaces = namespacesResponse.body.items.map(definition => {
    return {
      name: definition.metadata.name,
      definition
    };
  });
  return {namespaces};
};

const getPods = async (kubeContextName, clusterName, namespace) => {
  const podsResponse = await getApiClient(kubeContextName, clusterName).listNamespacedPod(namespace);
  const pods = podsResponse.body.items.map(definition => {
    return {
      name: definition.metadata.name,
      containers: definition.spec.containers.map(definition => {
        return {
          definition,
          name: definition.name
        }
      }),
      definition
    }
  });
  return pods;
};

(async () => {
  const kubeContext = loadContext();
  const cluster = kubeContext.clusters.find(c => c.name === 'minikube');
  const namespaces = await getNameSpaces(kubeContext.name, cluster.name);
  const pods = await getPods(kubeContext.name, cluster.name, namespaces.namespaces[0].name);

  console.log({kubeContext, cluster, namespaces});
  console.log(namespaces);
  console.log(pods[0].containers);
})();
