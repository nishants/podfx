import { SET_KUBE_CONTEXT_WITH_CLUSTERS, LOAD_KUBE_CONTEXT } from './workspace.action.types';

const INITIAL_STATE = {
  kubeContext: null,
  clusters: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_KUBE_CONTEXT_WITH_CLUSTERS:
      return {
        ...state,
        kubeContext: action.payload.name,
        clusters: action.payload.clusters,
      };
    default: return state;
  }
};

export default reducer;
