const {ipcMain} = require('electron');

const shellApis = {
  loadContext: require('./loadContext'),
  fileSelector: require('./fileSelector'),
  getNamespaces: require('./getNamespaces'),
};

const startShell = (appWindow, lib) => {
  const context = {lib, appWindow};
  for(let apiName in shellApis){
    const api = shellApis[apiName];
    ipcMain.on(api.toShell, async (event, payload) => {
      try{
        const result = await api.execute(context, payload);
        appWindow.webContents.send(api.fromShell, result);
      }catch(error){
        console.error(error);
        appWindow.webContents.send(api.fromShell, {$_error: error});
      }
    });
  }
};

module.exports = {start: startShell}
