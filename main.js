const electron = require("electron");
const app = electron.app;
const screen = electron.screen;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    const {width,height} = electron.screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
        backgroundColor: '#ffcf79',
        width: width,
        height: height,
        center: true,
        minHeight: 700,
        minWidth: 1100,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'files/login.html'),
        protocol: 'file',
        slashes: true

    }));
    win.on('closed', () => {
        win = null;
    })
    win.removeMenu();
}

app.on('ready', createWindow);
