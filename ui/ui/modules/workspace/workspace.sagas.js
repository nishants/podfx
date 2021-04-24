import {takeLatest, put, call} from 'redux-saga/effects';
// import {ipcRenderer} from 'electron';

import {
  LOAD_PROJECT,
  CREATE_PROJECT
} from './workspace.action.types';

import {
  loadProject,
  createProject
} from './workspace.actions';

function* executeLoadProjectAction(action){
  try {
    console.log("hello")
    console.log(appShell)
    console.log(window.appShell.messageIds.toShell.GET_KUBECTL_STATUS);
    window.appShell.sendMessage(window.appShell.messageIds.toShell.GET_KUBECTL_STATUS);
    window.appShell.on(window.appShell.messageIds.fromShell.SET_KUBECTL_STATUS, (payload, d) => {
      console.log("kubectl status", d)
    });
    yield call(alert, "Select a grpc.yml");
    // alert("Select a grpc.yml")
    // yield call(sendTokens, action.payload);
    // yield put(tokenTransferred());
    // yield put(fetchWallet());
  } catch (e) {
    // alert(`Somthing went wrong ${e.message}`);
  }
}

export default function*  workspaceSagas(){
  yield takeLatest(LOAD_PROJECT, executeLoadProjectAction);
}
