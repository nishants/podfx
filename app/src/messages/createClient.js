const {ipcRenderer} = require('electron');

const clientApis = {
  getKubeConfig: require('./getKubeConfig/getKubeConfig'),
  fileSelector: require('./fileSelector'),
};

module.exports = {
  create: () => {
    const client = {};
    for(let apiName in clientApis){
      client[apiName] = (payload = null) => {
        const api = clientApis[apiName];
        return new Promise((resolve, reject) => {
          ipcRenderer.once(api.fromShell, (sender, payload) => {
            resolve(payload);
          });
          ipcRenderer.send(api.toShell, payload);
        });
      }
    }
    return client;
  }
}
