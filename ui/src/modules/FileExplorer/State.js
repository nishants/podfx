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

export async function selectWorkspace(defualtDir) {
  // Use below link for options :
  // https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options

  const dialogConfig = {
    title: 'Select Kube Config',
    buttonLabel: 'Select Config',
    properties:['openFile', 'multiSelections', 'showHiddenFiles']
  };
  const result = await window.appShell.apiClient.fileSelector({dialogConfig});
  const path = result.filePaths.pop();
  window.setWorkspace({
    path : path,
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
