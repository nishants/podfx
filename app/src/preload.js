const messageIds = require('./shell/messageIds');
const {ipcRenderer} = require('electron');
const { contextBridge } = require('electron')

const appShell = {
  messageIds,
  sendMessage(id, payload) {
    ipcRenderer.send(id, payload);
  },
  on(id, callback) {
    ipcRenderer.on(id, callback);
  },
  off(id, callback) {
    ipcRenderer.removeListener(id, callback);
  },
  once(id, callback) {
    ipcRenderer.once(id, callback);
  },
}

console.log("*****************")
// Expose app shell to isolated context when running from url in dev mode
// https://www.electronjs.org/docs/tutorial/context-isolation
contextBridge.exposeInMainWorld('appShell', appShell);
