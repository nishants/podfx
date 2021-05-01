const messageIds = require('../messageIds');
const fromShell = messageIds.fromShell.GET_PODS;
const toShell = messageIds.toShell.GET_PODS ;

const execute = async (context, payload) => {
  return context.lib.getPods(payload);
};

module.exports = {
  fromShell,
  toShell,
  execute
};
