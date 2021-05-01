import React from 'react';
import {useWorkspace} from './State';
import KubecontextComponent from './KubeContext/Component';

const Form = () => {
  const workspace = useWorkspace();

  return (
    <div>
      <h1>My Form</h1>
      <KubecontextComponent/>
    </div>
  );
}

export default Form;
