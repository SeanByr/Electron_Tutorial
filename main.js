// app controls application event lifecycle
// BrowserWindow creates and manages app windows
const { app, BrowserWindow, ipcMain, Menu, shell} = require('electron/main');

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
        label: "New Window",
        click: () => {
          const win2 = new BrowserWindow({
            height: 300,
            width: 400,
            show: false,
            backgroundColor: "rgba(114, 8, 8, 0.2)",
          });

           win2.loadFile('index2.html');
          // win2.loadURL('https://github.com');
          win2.once('ready-to-show', () => win2.show());
        }
      },
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal('https://electronjs.org')
        }
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
      {
        role: "close",
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "Minimize",
      },
      {
        role: "close",
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
