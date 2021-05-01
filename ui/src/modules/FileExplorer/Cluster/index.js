import React from 'react';

const Cluster = ({clusters, setCluster, currentCluster}) => {
  const options = clusters.map(cluster => {
    return (
      <option
        key={cluster.name}
        value={cluster.name}>{cluster.name}</option>
    );
  });

  const setChosenCluster = (clusterName) => {
    const cluster = clusters.find(c => c.name === clusterName);
    setCluster(cluster);
  };

  return (
    <div>
      {JSON.stringify({clusters, setCluster, currentCluster})}
      <select
        onChange={(e) => setChosenCluster(e.currentTarget.value)}
        value={currentCluster.name}>
        {options}
      </select>
    </div>
  );
}

export default Cluster;
