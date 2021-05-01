import React from 'react';
import KubeContext from './KubeContext/Component';
import Select from '../Shared/Select';

const Form = ({clusters, kubeContext, namespaces, pods, loadKubeContext, getNameSpaces, getPods}) => {
  const [currentCluster, setCurrentCluster] = React.useState(null);
  const [currentNamespace, setCurrentNamespace] = React.useState(null);
  const [currentPod, setCurrentPod] = React.useState(null);
  const [currentContainer, setCurrentContainer] = React.useState(null);

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

  React.useEffect(() => {
    if(currentContainer){
      alert("Open file browser.")
    }
  }, [currentContainer]);

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
    </div>
  );
}

export default Form;
