import React from 'react';
import KubeContext from './KubeContext/Component';
import Select from '../Shared/Select';

const Form = ({clusters, kubeContext, loadKubeContext, getNameSpaces}) => {
  const [currentCluster, setCurrentCluster] = React.useState(null);
  const [currentNamespace, setCurrentNamespace] = React.useState(null);
  const [currentPod, setCurrentPod] = React.useState(null);

  // Load default kube context
  React.useEffect(() => {
    if(!kubeContext){
      loadKubeContext();
    }
  }, [kubeContext]);

  // Load default kube context
  React.useEffect(() => {
    if(currentCluster){
      getNameSpaces(kubeContext, currentCluster);
    }
  }, [currentCluster]);

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
        values={currentCluster?.namespaces || []}
        onChange={setCurrentNamespace}
        value={currentNamespace}
      />

      <Select
        values={currentNamespace?.pods || []}
        onChange={setCurrentPod}
        value={currentPod}
      />

      {JSON.stringify({
        currentCluster: currentCluster?.name,
        currentNamespace: currentNamespace?.name,
        currentPod: currentPod?.name,
      })}
    </div>
  );
}

export default Form;
