import React from 'react';

const KubeContext = ({name, selectWorkspace}) => {
  return (
    <div className='kube-context'>
      <label>KubeConfig:</label>
      <span>{name}</span>
      <button onClick={selectWorkspace}>Select</button>
    </div>
  );
}

export default KubeContext;
