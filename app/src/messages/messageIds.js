const toShell = {
  GET_KUBECTL_STATUS: 'to-messages/GET_KUBECTL_STATUS',
  SELECT_FILE: 'to-messages/SELECT_FILE',
  GET_NAMESPACES: 'to-messages/GET_NAMESPACES',
  GET_PODS: 'to-messages/GET_PODS',
  GET_FILES: 'to-messages/GET_FILES',
};

const fromShell = {
  SET_KUBECTL_STATUS: 'from-messages/SET_KUBECTL_STATUS',
  SET_SELECTED_FILE: 'from-messages/SET_SELECTED_FILE',
  GET_NAMESPACES: 'from-messages/GET_NAMESPACES',
  GET_PODS: 'from-messages/GET_PODS',
  GET_FILES: 'from-messages/GET_FILES',
};

module.exports = {
  toShell,
  fromShell
};
