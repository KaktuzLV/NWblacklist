const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const { createWorker} = require('tesseract.js');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


ipcMain.handle('capture-main-display', async () => {
  try {
    const displays = await screenshot.listDisplays();
    const mainDisplay = displays.find(display => display.primary) || displays[0];
    const worker = await createWorker('eng', 0);

    if (mainDisplay) {
      //const image = await screenshot({ screen: mainDisplay.id, format: 'png' });
      const filePath = './captured-screenshot.png';
      //fs.writeFileSync(filePath, image);
      const { data: { text } } = await worker.recognize(filePath, {
        rectangle: { top: 200, left: 580, width: 750, height: 620 },
      });
      await worker.terminate();
      
      console.log(text);
      return text;
    } else {
      throw new Error('Main display not found.');
    }
  } catch (err) {
    console.error('Error taking screenshot:', err);
    return 'Error taking screenshot'; 
  }
});