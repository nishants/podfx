import {
  SET_KUBE_CONTEXT_WITH_CLUSTERS,
  SET_NAMESPACES
} from './workspace.action.types';

const INITIAL_STATE = {
  kubeContext: null,
  clusters: [],
  namespaces: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_KUBE_CONTEXT_WITH_CLUSTERS:
      return {
        ...state,
        kubeContext: action.payload.name,
        clusters: action.payload.clusters,
        namespaces: []
      };

    case SET_NAMESPACES:
      return {
        ...state,
        namespaces: action.payload.namespaces
      };

    default: return state;
  }
};

export default reducer;
