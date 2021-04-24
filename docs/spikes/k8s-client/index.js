const k8s = require('@kubernetes/client-node');

const kubeConfig = new k8s.KubeConfig();

// Load default context
kubeConfig.loadFromDefault();

// kubectl config get-contexts
const kubeContexts = kubeConfig.getContexts();

console.log(kubeContexts);
