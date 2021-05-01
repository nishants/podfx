import {  SET_KUBE_CONTEXT_WITH_CLUSTERS, LOAD_KUBE_CONTEXT} from './workspace.action.types';

export const setKubeContextAndClusters = (payload) => {
  return {
    payload,
    type: SET_KUBE_CONTEXT_WITH_CLUSTERS,
  };
};

export const loadKubeContext = (path) => {
  return {
    type: LOAD_KUBE_CONTEXT,
  };
};
