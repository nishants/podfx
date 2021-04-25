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
    const response = yield call(window.appShell.apiClient.getKubeConfig);
    console.log("response from client interface : ", response);
  } catch (e) {
    // alert(`Somthing went wrong ${e.message}`);
  }
}

export default function*  workspaceSagas(){
  yield takeLatest(LOAD_PROJECT, executeLoadProjectAction);
}
