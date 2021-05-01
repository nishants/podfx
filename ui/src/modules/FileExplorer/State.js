import {useState} from 'react';

const nullWorkspace = {
  path : "/users/nish/kubeconfig.js",
  clusters: {count : 2}
};

const workspace = {
  callbacks : []
};

window.onWorkspaceUpdated = (callback) => {
  workspace.callbacks.push(callback);
  return () => {
    workspace.callbacks = workspace.callbacks.filter((c) => c !== callback);
  }
};

window.setWorkspace = (updated) => {
  workspace.callbacks.forEach((callback) => callback(updated));
}

export function selectWorkspace(filePath) {
  window.setWorkspace({
    path : filePath.target.value,
    clusters: {count : parseInt(Math.random() * 10)}
  });
};

export const useWorkspace = () => {
  const [workspace, setWorkspace] = useState(nullWorkspace);
  window.onWorkspaceUpdated((newWorkspace) => {
    setWorkspace(newWorkspace)
  });
  return workspace;
}
