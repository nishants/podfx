# Pod File Explorer

[![Build Status](https://dev.azure.com/nishantsingh870743/PodFx/_apis/build/status/nishants.podfx?branchName=master)](https://dev.azure.com/nishantsingh870743/PodFx/_build/latest?definitionId=3&branchName=master)

### Idea

> By using kubectl/API we can create a GUI app that can : 
>
> - view all cluster configured on my system
> - select a cluster
> - view all pods
> - choose a pod
> - open file system 
> - browse files
> - download files
> - upload files



# Components

- **GUI-CORE**  a react app that can be used inside a shell (e.g. electron, vs-code webframe)
- **NODE-API** : an npm module that can connect with kubectl/K8s API to execute command and return results. can be used in any mode env (e.g. electron, vs-code extension)
- **APP** : An electron app 



### Todo 

- [x] detect all cluster in local kubectl config

- [x] connect to a cluster

- [x] list namespaces in a cluster 

- [x] list pods in a cluster

- [x] get containers on a pod

- [x] run kubectul exec in a node program

- [x] run exec with file streams

- [x] run exec with custom streams

- [x] test spike with a cluster on AKS

- [ ] test spike on a with oauth protected ap

  > Did not pickup auth token from kubeconfig.
  >
  > Need to check this.

- [ ] create ui interactions with mocks

  - [x] promise based shell interaction in electron
  - [x] Select a kubecontext file from explorer:
    - https://www.electronjs.org/docs/api/dialog#dialogshowopendialogsyncbrowserwindow-options
    - https://stackoverflow.com/a/38544277/1065020
  - [ ] create a tree explorer ui
  - [ ] kubectl found
  - [ ] kubectul not found, select file
  - [ ] select cluster
  - [ ] select namepsace
  - [ ] select pod
  - [ ] select cluster
  - [ ] update files dynamically in ui

- [ ] download a file using exec

- [ ] create a text file using exec

- [ ] create a binary file using exec

- [ ] handle containers with sidecar



How to parse console outptuts and map it to a command ? 

- Every output will end with a `#` on cli.
- For every command, append it with `#` so we can ignore echoed command
- when reading output, ignore all lines with a `#` at end



### Contracts: 

- **`loadKubeContext(path = null)`**

  - Get kubernetes configuration from the path

  - if path is null, read default kubeconfig file

  - Sets the kube config in current lib.

  - returns  list of clusters and path: 

    ```yaml
    {
    	kubeContext : {
    		name: "/path/to/kubeconfig"
    	},
    	clusters: [
    		{name: ""},
        {name: ""},
        {name: ""},
    	]
    }
    ```

    

- **`getNameSpaces(kubeContextPath, clusterName)`**

  - Get list of namespaces in kubernetes cluster using the context file

  - The context should be already loaded in memory

  - returns list of names spaces

    ```yaml
    {
    	kubeContext : {name: "/path/to/kubeconfig"},
    	cluster: {name: "clusterName"}
    	namespaces: [
    		{name: ""},
        {name: ""},
        {name: ""},
    	]
    }
    ```

- **`getPods(kubeContextPath, clusterName, namespace)`**

  - get pods in namespace

    ```yaml
    {
    	kubeContext : {name: "/path/to/kubeconfig"},
    	cluster: {name: "clusterName"},
      namespace: {name: "namespace"},
    	pods: [
    		{name: ""},
        {name: ""},
        {name: ""},
    	]
    }
    ```

- **`getContainers(kubeContextPath, clusterName, namespace, podName)`**

  - get containers in pods

    ```yaml
    {
    	kubeContext : {name: "/path/to/kubeconfig"},
    	cluster: {name: "clusterName"},
      namespace: {name: "namespace"},
      pod: {name: "podName"},
    	containers: [
    		{name: ""},
        {name: ""},
        {name: ""},
    	]
    }
    ```

- **`GetFiles(kubeContextPath, clusterName, namespace, podName, containerName, path)`**

  - Get files in the path

    ```yaml
    {
    	kubeContext : {name: "/path/to/kubeconfig"},
    	cluster: {name: "clusterName"},
      namespace: {name: "namespace"},
      pod: {name: "podName"},
    	container: {name: "contaierName"},
    	path: "/path/to/dir",
    	contents: [
    		{name: "app", type: "file", created: "23/02/2021"},
        {name: "lib", type: "dir" , created: "23/02/2021"},
    	]
    }
    ```

    

  

- 

  ```
  ```

  

### Resources

- K8s NodeJs API: https://github.com/kubernetes-client/javascript
- How kubectl exec works : https://erkanerol.github.io/post/how-kubectl-exec-works/
- exec implentation in node : https://github.com/kubernetes-client/javascript/blob/master/src/exec.ts
- exec example with nodejs: https://github.com/kubernetes-client/javascript/blob/master/examples/typescript/exec/exec-example.ts
- streams in nodejs : https://nodesource.com/blog/understanding-streams-in-nodejs/
- cp implementation in api: https://github.com/kubernetes-client/javascript/blob/master/src/cp.ts