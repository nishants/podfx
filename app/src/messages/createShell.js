const {ipcMain} = require('electron');

const shellApis = {
  getKubeConfig: require('./getKubeConfig/getKubeConfig')
};

const startShell = (appWindow, lib) => {
  const context = {lib};
  for(let apiName in shellApis){
    const api = shellApis[apiName];
    ipcMain.on(api.toShell, async (event, payload) => {
      const result = await api.execute(context, payload);
      appWindow.webContents.send(api.fromShell, result);
    });
  }
};

module.exports = {start: startShell}
