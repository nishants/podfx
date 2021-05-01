import {useState} from 'react';

const nullWorkspace = {
  path : "/users/nish/kubeconfig.js",
  clusters: [
    {name: "cluster-one"},
    {name: "cluster-two"},
    {name: "cluster-three"},
  ]
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
  const random = parseInt(Math.random() * 10);
  window.setWorkspace({
    path : path,
    clusters: [
      {name: "cluster-one"},
      {name: "cluster-two"},
      {name: "cluster-three"},
    ].map(c => {
      return {...c, name: c.name + random}
    })
  });
};

export const useWorkspace = () => {
  const [workspace, setWorkspace] = useState(nullWorkspace);
  window.onWorkspaceUpdated((newWorkspace) => {
    setWorkspace(newWorkspace)
  });
  return workspace;
}
