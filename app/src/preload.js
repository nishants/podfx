const { contextBridge } = require('electron')
const client = require('./messages/createClient')

const appShell = {
  apiClient : client.create(),
  // sendMessage(id, payload) {
  //   ipcRenderer.send(id, payload);
  // },
  // on(id, callback) {
  //   ipcRenderer.on(id, callback);
  // },
  // off(id, callback) {
  //   ipcRenderer.removeListener(id, callback);
  // },
  // once(id, callback) {
  //   ipcRenderer.once(id, callback);
  // },
}
// Expose app messages to isolated context when running from url in dev mode
// https://www.electronjs.org/docs/tutorial/context-isolation
contextBridge.exposeInMainWorld('appShell', appShell);
