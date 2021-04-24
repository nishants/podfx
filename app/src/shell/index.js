const {ipcMain} = require('electron');
const messageIds = require('./messageIds');

module.exports = {
  start: (appWindow) => {
    ipcMain.on(messageIds.toShell.GET_KUBECTL_STATUS, () => {
      appWindow.webContents.send(
        messageIds.fromShell.SET_KUBECTL_STATUS,
        {
          found: true,
          content: {
            data: "yeah"
          }
        },
      );
    });
  }
}
