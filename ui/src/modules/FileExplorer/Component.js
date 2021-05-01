import React from 'react';
import {useWorkspace} from './State';
import KubecontextComponent from './KubeContext/Component';
import Cluster from './Cluster';

const Form = () => {
  const workspace = useWorkspace();

  const [currentCluster, setCurrentCluster] = React.useState(null);

  return (
    <div>
      <h1>My Form</h1>
      <KubecontextComponent/>
      <Cluster
        clusters={workspace.clusters}
        setCluster={setCurrentCluster}
        currentCluster={currentCluster}
      />
      {JSON.stringify({workspace, currentCluster})}
    </div>
  );
}

export default Form;
