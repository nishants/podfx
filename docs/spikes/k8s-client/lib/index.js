const k8s = require('@kubernetes/client-node');
const parseLsOutput = require('./ls');
const executeCommand = require('./ls/executeCommand');
const copyFileFromPod = require('./ls/copyFileFromPod');
const uploadFileToPod = require('./ls/uploadFileToPod');

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
  const command = ['ls','-lhaF' , path];
  const output = await executeCommand(exec, namespace, podName, containerName, command);
  return parseLsOutput(output);
}

(async () => {
  const kubeContext = loadContext();
  const kubeContextName = kubeContext.name;
  const clusterName = 'minikube';
  const namespace = 'default';

  const namespaces = await getNameSpaces({kubeContextName, clusterName});

  const {pods} = await getPods({kubeContextName, clusterName, namespace});
  const podName = pods[0].name;
  const containerName = pods[0].containers[0].name;
  const exec = new k8s.Exec(getContext(kubeContextName));
  const files = await getFiles({ kubeContextName, namespace, podName, containerName, path : "/"});

  const aFile = files.find(f => !f.isDir);
  // console.log({aFile});

  // const cp = new k8s.Cp(getContext(kubeContext.name));
  // await cp.cpToPod(namespace, 'pricing-deployment-f54585c4c-6z4ql', containerName, fileToUpload, pathToUploadAt);
  // const fileToUpload = "/Users/dawn/projects/podfs/docs/spikes/k8s-client/lib/temp/hello-world.txt";
  // const pathToUploadAt = "/app/hello-world.txt";
  // await uploadFileToPod(exec, namespace, podName, containerName, fileToUpload, pathToUploadAt);
  // console.log("Copied to ", {namespace, podName, containerName});

  const srcPath = `/app/appsettings.json`;
  const localpath = '/Users/dawn/projects/podfs/docs/spikes/k8s-client/lib/temp/appsettings.json';
  await copyFileFromPod(exec, namespace, podName, containerName, srcPath, localpath);
  //
  // console.log({kubeContext, cluster, namespaces});
  // console.log(namespaces);
  // console.log(pods[0].containers);
})();
