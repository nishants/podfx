import React from 'react';
import KubeContext from './KubeContext/Component';
import Select from '../Shared/Select';
import Files from './Files';

const Form = ({clusters, kubeContext, namespaces, pods, loadKubeContext, getNameSpaces, getPods}) => {
  const [currentCluster, setCurrentCluster] = React.useState(null);
  const [currentNamespace, setCurrentNamespace] = React.useState(null);
  const [currentPod, setCurrentPod] = React.useState(null);
  const [currentContainer, setCurrentContainer] = React.useState(null);

  const getFiles = (path = "/") => {
    const params = {
      kubeContextName : kubeContext,
      namespace: currentNamespace.name,
      podName: currentPod.name,
      containerName: currentContainer.name,
      path
    };
    return window.appShell.apiClient.getFiles(params)
      .catch(e => alert(`Failed to get files ${e.message}`))
  };

  const downloadFile = (pathInPod) => {
    const params = {
      kubeContextName : kubeContext,
      namespace: currentNamespace.name,
      podName: currentPod.name,
      containerName: currentContainer.name,
      pathInPod,
      pathOnLocal: "/Users/dawn/projects/podfs/docs/spikes/k8s-client/lib/temp/downloaded.txt"
    };
    return window.appShell.apiClient.downloadFile(params)
      .catch(e => alert(`Failed to download file:  ${e.message}`))
  };

  // Load default kube context
  React.useEffect(() => {
    if(!kubeContext){
      loadKubeContext();
    }
  }, [kubeContext]);

  React.useEffect(() => {
    if(currentCluster){
      getNameSpaces(kubeContext, currentCluster);
    }
  }, [currentCluster]);

  React.useEffect(() => {
    if(currentCluster){
      getPods(kubeContext, currentCluster, currentNamespace);
    }
  }, [currentNamespace]);

  // React.useEffect(() => {
  //   if(currentContainer){
  //     openFiles();
  //   }
  // }, [currentContainer]);

  const fileExplorer = currentContainer ? (
    <Files
      getFiles={getFiles}
      downloadFile={downloadFile}
    />
  ) : null;

  return (
    <div>
      <KubeContext
        path={kubeContext?.name}
        selectWorkspace={loadKubeContext}
      />

      <Select
        values={clusters}
        onChange={setCurrentCluster}
        value={currentCluster}
      />

      <Select
        values={namespaces || []}
        onChange={setCurrentNamespace}
        value={currentNamespace}
      />

      <Select
        values={pods || []}
        onChange={setCurrentPod}
        value={currentPod}
      />

      <Select
        values={currentPod?.containers || []}
        onChange={setCurrentContainer}
        value={currentContainer}
      />

      {JSON.stringify({
        currentCluster: currentCluster?.name,
        currentNamespace: currentNamespace?.name,
        currentPod: currentPod?.name,
        currentContainer: currentContainer?.name
      })}

      { fileExplorer }

    </div>
  );
}

export default Form;
