import {takeLatest, put, call} from 'redux-saga/effects';

import {
  LOAD_KUBE_CONTEXT
} from './workspace.action.types';

import {
  setKubeContextAndClusters
} from './workspace.actions';

function* executeLoadKubeContext(action){
  try {
    const response = yield call(window.appShell.apiClient.loadContext, action.path);
    yield put(setKubeContextAndClusters(response));
  } catch (e) {
    alert(`Failed loadin kube context : ${e.message}`);
  }
}

export default function*  workspaceSagas(){
  yield takeLatest(LOAD_KUBE_CONTEXT, executeLoadKubeContext);
}
