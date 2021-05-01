import {
  SET_KUBE_CONTEXT_WITH_CLUSTERS,
  SET_NAMESPACES,
  SET_PODS
} from './workspace.action.types';

const INITIAL_STATE = {
  kubeContext: null,
  clusters: [],
  namespaces: [],
  pods: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_KUBE_CONTEXT_WITH_CLUSTERS:
      return {
        ...state,
        kubeContext: action.payload.name,
        clusters: action.payload.clusters,
        namespaces: [],
        pods: []
      };

    case SET_NAMESPACES:
      return {
        ...state,
        namespaces: action.payload.namespaces,
        pods: []
      };

    case SET_PODS:
      return {
        ...state,
        pods: action.payload.pods
      };

    default: return state;
  }
};

export default reducer;
