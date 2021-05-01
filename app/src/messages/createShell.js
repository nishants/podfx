const {ipcMain} = require('electron');

const shellApis = {
  loadContext: require('./loadContext'),
  fileSelector: require('./fileSelector'),
};

const startShell = (appWindow, lib) => {
  const context = {lib, appWindow};
  for(let apiName in shellApis){
    const api = shellApis[apiName];
    ipcMain.on(api.toShell, async (event, payload) => {
      const result = await api.execute(context, payload);
      appWindow.webContents.send(api.fromShell, result);
    });
  }
};

module.exports = {start: startShell}
