# Pod File Explorer



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

- [ ] detect all cluster in local kubectl config
- [ ] connect to a cluster and run kubectul exec in a node program



### Resources

- K8s NodeJs API: https://github.com/kubernetes-client/javascript
- How kubectl exec works : https://erkanerol.github.io/post/how-kubectl-exec-works/