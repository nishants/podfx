const k8s = require('@kubernetes/client-node');
const getFilesFromContainer = require('./commands/getFiles');

const contexts = {};
const apiClients = {};

const getContext = (contextName) => {
  const context = contexts[contextName];
  if(!context){
    throw new Error(`"${contextName}" : kube context not found.`);
  }
  return context;
};

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
    clusters: getContext(name).getContexts()
  };
};

const getApiClient = (kubeContextName, clusterName) => {
  const apicClientName = `${kubeContextName}-${clusterName}`;
  if(!apiClients[apicClientName]){
    apiClients[apicClientName] = getContext(kubeContextName).makeApiClient(k8s.CoreV1Api);
  }
  return apiClients[apicClientName];
}

const getNameSpaces = async ({kubeContextName, clusterName})=> {
  getContext(kubeContextName).setCurrentContext(clusterName);
  const namespacesResponse = await getApiClient(kubeContextName, clusterName).listNamespace();
  const namespaces = namespacesResponse.body.items.map(definition => {
    return {
      name: definition.metadata.name,
      definition
    };
  });
  return {namespaces};
};

const getPods = async ({kubeContextName, clusterName, namespace}) => {
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
  return {pods};
};

const getFiles = async ({ kubeContextName, namespace, podName, containerName, path = "/"}) => {
  const exec = new k8s.Exec(getContext(kubeContextName));
  return getFilesFromContainer(exec, namespace, podName, containerName, path);
}

module.exports = {
  loadContext,
  getApiClient,
  getNameSpaces,
  getPods,
  getFiles
}
