const messageIds = require('../messageIds');
const fromShell = messageIds.fromShell.SET_KUBECTL_STATUS;
const toShell = messageIds.toShell.GET_KUBECTL_STATUS ;

const execute = async (context, payload) => {
  const kubeConfig = await context.lib.getKubeConfig();
  return {
    kubeConfigFound: !!kubeConfig,
    content: kubeConfig
  };
};

module.exports = {
  fromShell,
  toShell,
  execute
};
