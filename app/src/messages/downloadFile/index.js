const messageIds = require('../messageIds');
const fromShell = messageIds.fromShell.DOWNLOAD_FILE;
const toShell = messageIds.toShell.DOWNLOAD_FILE ;

const execute = async (context, payload) => {
  return context.lib.downloadFile(payload);
};

module.exports = {
  fromShell,
  toShell,
  execute
};
