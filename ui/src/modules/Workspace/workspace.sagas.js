import {takeLatest, put, call} from 'redux-saga/effects';

import {
  LOAD_KUBE_CONTEXT,
  GET_NAMESPACES,
  GET_PODS
} from './workspace.action.types';

import {
  setKubeContextAndClusters,
  setNamespaces
} from './workspace.actions';

function* executeLoadKubeContext(action){
  try {
    const response = yield call(window.appShell.apiClient.loadContext, action.path);
    yield put(setKubeContextAndClusters(response));
  } catch (e) {
    alert(`Failed loadin kube context : ${e.message}`);
  }
}

function* executeGetNamespaces(action){
  try {
    const kubeContextName = action.payload.kubeContext;
    const clusterName = action.payload.cluster.name;
    const response = yield call(window.appShell.apiClient.getNamespaces, {kubeContextName, clusterName});
    yield put(setNamespaces(response));
  } catch (e) {
    alert(`Failed to get namespaces : ${e.message}`);
  }
}

function* executeGetPods(action){
  try {
    const kubeContextName = action.payload.kubeContext;
    const clusterName = action.payload.cluster.name;
    const namespace = action.payload.namespace.name;
    const response = yield call(window.appShell.apiClient.getPods, {kubeContextName, clusterName, namespace});
    console.log(response)
    // yield put(setKubeContextAndClusters(response));
  } catch (e) {
    alert(`Failed to get namespaces : ${e.message}`);
  }
}

export default function*  workspaceSagas(){
  yield takeLatest(LOAD_KUBE_CONTEXT, executeLoadKubeContext);
  yield takeLatest(GET_NAMESPACES, executeGetNamespaces);
  yield takeLatest(GET_PODS, executeGetPods);
}
