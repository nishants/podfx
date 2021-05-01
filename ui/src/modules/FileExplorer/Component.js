import React from 'react';
import {useWorkspace} from './State';
import KubecontextComponent from './KubeContext/Component';
import Cluster from './Cluster';

const Form = () => {
  const workspace = useWorkspace();
  const [clusters, setClusters] = React.useState([
    {name: "cluster-one"},
    {name: "cluster-two"},
    {name: "cluster-three"},
  ]);

  const [currentCluster, setCurrentCluster] = React.useState(clusters[0]);

  return (
    <div>
      <h1>My Form</h1>
      <KubecontextComponent/>
      <Cluster
        clusters={clusters}
        setCluster={setCurrentCluster}
        currentCluster={currentCluster}
      />
    </div>
  );
}

export default Form;
