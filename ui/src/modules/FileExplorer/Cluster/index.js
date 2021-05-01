import React from 'react';

const Cluster = ({clusters, setCluster, currentCluster}) => {
  const options = clusters.map(cluster => {
    return (
      <option
        key={cluster.name}
        value={cluster.name}>{cluster.name}</option>
    );
  });

  const setChosenCluster = (event) => {
    const cluster = clusters.find(c => c.name === event.currentTarget.value);
    setCluster(cluster);
  };

  const selectRef = React.useRef(null);

  //reset selected cluster when new list of clusters are available
  React.useEffect(() => {
    selectRef.current.value= "$__no_cluster_$";
    setCluster(null);
  }, [clusters]);

  return (
    <div>
      <select
        ref={selectRef}
        onChange={setChosenCluster}>
        <option disabled value="$__no_cluster_$"> -- select an option -- </option>
        {options}
      </select>
    </div>
  );
}

export default Cluster;
