import {all} from 'redux-saga/effects';
import workspaceSaga from './modules/Workspace/workspace.sagas';

export default function* rootSaga(){
  yield all([
    workspaceSaga()
  ]);
}
