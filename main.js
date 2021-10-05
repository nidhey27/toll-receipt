const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");

const fs = require('fs');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        worldSafeExecuteJavaScript: true, 
        contextIsolation: false,
        enableRemoteModule: true,
        preload: path.join(__dirname, "preload.js")
      }
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)
  win.maximize()



  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

function yo () {
  // Create the browser window.
  console.log('yo');
}

ipcMain.on('add-to-json', (event, args) => { // doStuff
  fs.readFile('data.json', function (err, data) {
      var json = JSON.parse(data)
      json.push(args)
      
      fs.writeFile("data.json", JSON.stringify(json), (err, data) => {
        if(err) console.log('error', err);
      })
  })
});


// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})