import {
  SET_KUBE_CONTEXT_WITH_CLUSTERS,
  LOAD_KUBE_CONTEXT,

  GET_NAMESPACES,
  SET_NAMESPACES
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

export const setNamespaces = (payload) => {
  return {
    type: SET_NAMESPACES,
    payload
  };
};
