import { combineReducers } from 'redux';
import workspace from './modules/Workspace/workspace.reducer';

const rootReducer = combineReducers({
  workspace,
});

export default rootReducer;
