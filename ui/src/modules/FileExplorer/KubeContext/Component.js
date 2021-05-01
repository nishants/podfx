import React from 'react';

import {useWorkspace, selectWorkspace} from '../State';

const KubeContext = () => {
  const workspace = useWorkspace();

  return (
    <div className='kube-context'>
      <label>KubeConfig:</label>
      <span>{workspace.path}({workspace.clusters.count})</span>
      <input type='file' onChange={selectWorkspace}/>
    </div>
  );
}

export default KubeContext;
