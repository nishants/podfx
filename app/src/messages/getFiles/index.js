const messageIds = require('../messageIds');
const fromShell = messageIds.fromShell.GET_FILES;
const toShell = messageIds.toShell.GET_FILES ;

const execute = async (context, payload) => {
  return context.lib.getFiles(payload);
};

module.exports = {
  fromShell,
  toShell,
  execute
};
