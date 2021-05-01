import React from 'react';
import {useWorkspace} from './State';
import KubecontextComponent from './KubeContext/Component';
import Select from '../Shared/Select';

const Form = () => {
  const workspace = useWorkspace();
  const [currentCluster, setCurrentCluster] = React.useState(null);
  const [currentNamespace, setCurrentNamespace] = React.useState(null);
  const [currentPod, setCurrentPod] = React.useState(null);

  return (
    <div>
      <h1>My Form</h1>
      <KubecontextComponent/>
      <Select
        values={workspace.clusters}
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
