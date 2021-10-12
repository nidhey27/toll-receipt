const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const db = require('electron-db');
const fs = require('fs');

const location = path.join(__dirname, '')

const XLSX = require('xlsx');
const Excel = require('exceljs');


let win;

function createWindow () {
  db.createTable('receipts', location, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if (succ) {
      console.log(msg)
    } else {
      console.log('An error has occured. ' + msg)
    }
  })
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
  let obj = new Object();

    obj = args;

    if (db.valid('receipts', location)) {
      db.insertTableContent('receipts', location, obj, (succ, msg) => {
        // succ - boolean, tells if the call is successful
        console.log("Success: " + succ);
        console.log("Message: " + msg);
      })
    }
});

ipcMain.on('export-to-excel', (event, args) => {
    const options = {
      filename: 'myfile.xlsx',
      useStyles: true,
      useSharedStrings: true
    };
    
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    
    const worksheet = workbook.addWorksheet('my sheet');
    
    worksheet.columns = [
        { header: 'Id', key: 'id' },
        { header: 'Vehicle Number', key: 'vehicle_number' },
        { header: 'Type', key: 'type' },
        { header: 'Amount', key: 'amount' }
    ]

    var datas;
    db.getAll('receipts', location, (succ, data) => {
      // succ - boolean, tells if the call is successful
      // data - array of objects that represents the rows.
      datas = data;
    })
    
    console.log(datas);
    for(let i = 0; i<=datas.length; i++){
      
      data = {
        id: i,
        'first name': "name "+i,
        ph: "012014520"+i
      };
    
      worksheet.addRow(datas[i]).commit();
    }
    
    workbook.commit().then(function() {
      console.log('excel file cretaed');
    });
})

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