const messageIds = require('../messageIds');
const fromShell = messageIds.fromShell.SET_KUBECTL_STATUS;
const toShell = messageIds.toShell.GET_KUBECTL_STATUS ;

const execute = async (context, payload) => {
  return context.lib.loadContext(payload ? payload.kubeConfigPath : null);
};

module.exports = {
  fromShell,
  toShell,
  execute
};
