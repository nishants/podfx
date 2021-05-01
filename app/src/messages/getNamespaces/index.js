const messageIds = require('../messageIds');
const fromShell = messageIds.fromShell.GET_NAMESPACES;
const toShell = messageIds.toShell.GET_NAMESPACES ;

const execute = async (context, payload) => {
  return context.lib.getNameSpaces(payload);
};

module.exports = {
  fromShell,
  toShell,
  execute
};
