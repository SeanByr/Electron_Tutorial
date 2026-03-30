// app controls application event lifecycle
// BrowserWindow creates and manages app windows
const { app, BrowserWindow, ipcMain, Menu } = require('electron/main');

const path = require('node:path')

const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "Learn More",
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
      },
    ],
  },
]

const menu = Menu.buildFromTemplate(menuItems)
Menu.setApplicationMenu(menu)

//creastWindow() function loads your web page into a new
// BrowserWindow instance
const createWindow = () => {
    //BrowswerWindows can only be create after the app module's **ready** event is finished
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

// calls CreateWindow() function when the app is ready
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
    createWindow();

    //macOS ONLY
    //macOS apps continue running without any windows open
    //'activate' event calls existing createWindow() method to open new window
    //if now current windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

    //WINDOWS/LINUX ONLY
    //when all windows are closed, quit entire application
    app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
      app.quit()
    } 
  })
