import {
  SET_KUBE_CONTEXT_WITH_CLUSTERS,
  LOAD_KUBE_CONTEXT,

  GET_NAMESPACES,
  SET_NAMESPACES,

  GET_PODS,
  SET_PODS
} from './workspace.action.types';

export const setKubeContextAndClusters = (payload) => {
  return {
    payload,
    type: SET_KUBE_CONTEXT_WITH_CLUSTERS,
  };
};

export const loadKubeContext = (payload) => {
  return {
    payload,
    type: LOAD_KUBE_CONTEXT,
  };
};

export const getNameSpaces = (kubeContext, cluster) => {
  return {
    type: GET_NAMESPACES,
    payload: {kubeContext, cluster}
  };
};

export const getPods = (kubeContext, cluster, namespace) => {
  return {
    type: GET_PODS,
    payload: {kubeContext, cluster, namespace}
  };
};

export const setNamespaces = (payload) => {
  return {
    type: SET_NAMESPACES,
    payload
  };
};

export const setPods = (payload) => {
  return {
    type: SET_PODS,
    payload
  };
};
