**Problem : Copying absolute file name**

-  Kubectl API 

  ```bash
  kubectl cp <podname>:<path/in/pod> <local/filt/path/to/create>
  
  # e.g. (given `Grpc.Net.Common.dll` is in workding dir of pod)
  kubectl cp pricing-deployment-f54585c4c-6z4ql:Grpc.Net.Common.dll  /Users/dawn/temp.dll
  
  # With absolute path
  kubectl cp pricing-deployment-f54585c4c-6z4ql:/usr/lib/tmpfiles.d/passwd.conf  /Users/dawn/projects/podfs/docs/spikes/k8s-client/lib/temp/passwd.conf  
  # Gives error : tar: Removing leading `/' from member names
  # but succeeds
  refer : 
  - https://github.com/kubernetes/kubernetes/issues/82169
  - https://github.com/kubernetes/kubernetes/issues/58692
  
  ```

  So, it writes error on stderr but succeeds.

  In node api here : https://github.com/kubernetes-client/javascript/blob/965da9b982955ab5168038a66908b38283417a35/src/cp.ts#L44

  The code rejects promise if anything is written on stderror. So copying absolute filenames is not possible.

  Solution : 

  - **Monkey patch**

    Copy the code but do not throw error.

TO create custom clien : 

```
yarn add stream-buffers tar
```



- 

```bash
kubectl api : 


tar: Removing leading `./../' from member names
NodeJS API : 
const cp = new k8s.Cp(getContext(kubeContext.name));
cp.cpFromPod(namespace, podName, containerName, 
         pathToFileOnPod, 
         dirOnLocal
);
 
command that runs on pod : 
tar zcf -, srcPath 
tar zcf - /app/Grpc.Net.Common.dll 
tar zcf -f - Grpc.Net.Common.dll 
tar -xf /app/Grpc.Net.Common.dll --xform='s|^|Grpc.Net.Common/|S'
```







### Problems with kubectl cp

- Tar needs to be present in container image 

  > **!!!Important Note!!! # Requires that the 'tar' binary is present in your container # image. If 'tar' is not present, 'kubectl cp' will fail. # # For advanced use cases, such as symlinks, wildcard expansion or # file mode preservation consider using 'kubectl exec'. # Copy /tmp/foo local file to /tmp/bar in a remote pod in namespace**

- Alternative : 

  - try with sh
  - try with bash
  - if both not found throw error
  - echo file contents on cli and copy it.

- In cli : 

  ```bash
  kubectl cp pricing-deployment-f54585c4c-6z4ql:/app/Grpc.Net.Common.dll /Users/dawn/projects/podfs/docs/spikes/k8s-client/lib/temp/temp.dll
  
  ```

  

### 