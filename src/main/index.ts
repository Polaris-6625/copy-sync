import { app, shell, BrowserWindow, globalShortcut, Tray, nativeImage, Menu, ipcMain, dialog, clipboard } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset';
import {readDataJSON} from "./localData/readAll";
import { clearItem } from './localData/clearItem';
import { writeDataJSON } from './localData/write';

let mainWindow:any;
let lastClipboardContent: string = '';

// 监听剪贴板变化
function startClipboardMonitor() {
  // 每秒检查一次剪贴板
  setInterval(() => {
    const currentContent = clipboard.readText();
    // 只有当内容变化且不为空时才更新
    if (currentContent !== lastClipboardContent && currentContent.trim() !== '') {
      lastClipboardContent = currentContent;
      writeDataJSON(currentContent).then(() => {
        if (mainWindow) {
          mainWindow.webContents.send("read-All", readDataJSON());
        }
      });
    }
  }, 1000); // 1000ms = 1秒
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 330,
    height: 520,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  // globalShortcut.register('CommandOrControl+C', () => {
  //   // 复制文本到剪贴板
  //   mainWindow.webContents.copy();

  //   // 获取剪贴板中的文本内容
  //   const text = clipboard.readText();``
  //   console.log('Copied text:', text);

  //   // 这里可以对剪贴板中的文本进行进一步处理
  //   // ...
  // });
  ipcMain.on('fetchData', (event) => {
    // 在这里调用readDataJSON方法获取数据
    const data = readDataJSON();
    // 将数据发送给渲染线程
    event.sender.send('dataFetched', data);
  });
  ipcMain.on('clear-Item', async (event,title) => {
    await clearItem(title)
    event.reply('read-clear-reply', { success: true });
    mainWindow.webContents.send("read-All",readDataJSON())
  });
  ipcMain.on('set-Item',async (event,data) => {
    await clipboard.writeText(data)
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.send("read-All",readDataJSON())
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
let clipboardText:any;
function copyToClipboard() {
  // 获取当前聚焦的窗口实例
  const focusedWindow = BrowserWindow.getFocusedWindow();
  console.log(focusedWindow)
  if (focusedWindow) {
    focusedWindow.webContents.executeJavaScript(`
      const selectedText = window.getSelection().toString();
      selectedText;
    `).then((selectedText) => {
      if (selectedText) {
        clipboard.writeText(selectedText);
        console.log('Copied selected text to clipboard:', selectedText);
      }
    }).catch((error) => {
      console.error('Error executing JavaScript:', error);
    });
  }
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray;
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  
  // 启动剪贴板监听
  startClipboardMonitor()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  globalShortcut.register('CommandOrControl+I', () => {
    createWindow();
  })
  
  const icon = nativeImage.createFromPath('../../resources/icon.png')
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: '全部清除', type: 'radio' },
    { label: '配置项', type: 'radio', checked: true },
    { label: '显示帮助', type: 'radio' },
    { label: '联系我们', type: 'radio' },
    { label: '发送反馈', type: 'radio' },
    { label: '退出', type: 'radio' }
  ])
  
  tray.setContextMenu(contextMenu)
  tray.setToolTip('This is copy-sync')
  tray.setTitle('copy-sync')
  
}).then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
