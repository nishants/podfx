import React from 'react';
import {connect} from 'react-redux';

import FileExplorer from './Component';

import {
  loadKubeContext,
} from "../workspace/workspace.actions"

const mapStateToProps = (state) => {
  return state.workspace;
};

const mapDispatchToProps = dispatch => {
  return {
    loadKubeContext: (path) => dispatch(loadKubeContext(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorer);
