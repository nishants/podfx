const {ipcRenderer} = require('electron');

const clientApis = {
  loadContext: require('./loadContext'),
  fileSelector: require('./fileSelector'),
  getNamespaces: require('./getNamespaces'),
};

module.exports = {
  create: () => {
    const client = {};
    for(let apiName in clientApis){
      client[apiName] = (payload = null) => {
        const api = clientApis[apiName];
        return new Promise((resolve, reject) => {
          ipcRenderer.once(api.fromShell, (sender, payload) => {
            if(payload.$_error){
              return reject(payload.$_error);
            }
            resolve(payload);
          });
          ipcRenderer.send(api.toShell, payload);
        });
      }
    }
    return client;
  }
}
