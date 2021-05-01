import {useState} from 'react';

const createNamespaces = (clusterName) => {
  return [
    {name: "namespace-1" + clusterName},
    {name: "namespace-2" + clusterName},
    {name: "namespace-3" + clusterName},
    {name: "namespace-4" + clusterName},
  ]
};

const nullWorkspace = {
  path : "/users/nish/kubeconfig.js",
  clusters: [
    {name: "cluster-one", namespaces: createNamespaces("one")},
    {name: "cluster-two", namespaces: createNamespaces("two")},
    {name: "cluster-three", namespaces: createNamespaces("three")},
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
      {name: "cluster-one"  , namespaces: createNamespaces("one-" + random)},
      {name: "cluster-two"  , namespaces: createNamespaces("two-" + random)},
      {name: "cluster-three", namespaces: createNamespaces("three-" + random)},
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
