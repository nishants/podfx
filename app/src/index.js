const { app, BrowserWindow } = require('electron');
const path = require('path');

const shell = require('./messages/createShell');

const lib = {
  getKubeConfig: async () => "kubeconfig from lib mock"
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: true, // Otherwise appShell from preload will not be accessible in dev mode https://www.electronjs.org/docs/tutorial/context-isolation
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.maximize();
  // Allow using the webpack dev server for local development
  shell.start(mainWindow, lib);

  if(process.env.devUrl){
    mainWindow.loadURL(process.env.devUrl);
    mainWindow.webContents.openDevTools();
    return;
  }
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname,"..", "assets", 'index.html'));
  // Open the DevTools.
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
