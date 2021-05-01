import React from 'react';
import {connect} from 'react-redux';

import FileExplorer from './Component';

import {
  loadKubeContext,
  getNameSpaces
} from "../workspace/workspace.actions"

const mapStateToProps = (state) => {
  return state.workspace;
};

const mapDispatchToProps = dispatch => {
  return {
    loadKubeContext: (path) => dispatch(loadKubeContext(path)),
    getNameSpaces: (kubeContext, cluster) => dispatch(getNameSpaces(kubeContext, cluster)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorer);
