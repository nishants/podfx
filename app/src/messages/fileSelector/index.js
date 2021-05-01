const messageIds = require('../messageIds');
const fromShell = messageIds.fromShell.SET_SELECTED_FILE;
const toShell = messageIds.toShell.SELECT_FILE ;
const { dialog } = require('electron')


const execute = async (context, payload) => {
  return dialog.showOpenDialog(payload.dialogConfig);
};

module.exports = {
  fromShell,
  toShell,
  execute
};
