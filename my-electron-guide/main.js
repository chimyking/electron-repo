const {
	app,
	BrowserWindow,
	ipcMain,
	dialog,
	Menu,
	nativeTheme,
} = require('electron')
const path = require('path')

async function handleFileOpen() {
	const { canceled, filePaths } = await dialog.showOpenDialog()
	if (canceled) {
		return
	} else {
		return filePaths[0]
	}
}

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	})

	const menu = Menu.buildFromTemplate([
		{
			label: app.name,
			submenu: [
				{
					click: () => win.webContents.send('update-counter', 1),
					label: 'Increment',
				},
				{
					click: () => win.webContents.send('update-counter', -1),
					label: 'Decrement',
				},
			],
		},
	])

	Menu.setApplicationMenu(menu)

	win.loadFile('index.html')

	win.webContents.on(
		'select-bluetooth-device',
		(event, deviceList, callback) => {
			event.preventDefault()
			if (deviceList && deviceList.length > 0) {
				callback(deviceList[0].deviceId)
			}
		}
	)

	win.webContents.session.on(
		'select-hid-device',
		(event, details, callback) => {
			event.preventDefault()
			if (details.deviceList && details.deviceList.length > 0) {
				callback(details.deviceList[0].deviceId)
			}
		}
	)

	win.webContents.session.on('hid-device-added', (event, device) => {
		console.log('hid-device-added FIRED WITH', device)
	})

	win.webContents.session.on('hid-device-removed', (event, device) => {
		console.log('hid-device-removed FIRED WITH', device)
	})

	win.webContents.session.setPermissionCheckHandler(
		(webContents, permission, requestingOrigin, details) => {
			if (permission === 'hid' && details.securityOrigin === 'file:///') {
				return true
			}
		}
	)

	win.webContents.session.setDevicePermissionHandler((details) => {
		if (details.deviceType === 'hid' && details.origin === 'file://') {
			return true
		}
	})

	ipcMain.on('set-title', (event, title) => {
		const webContents = event.sender
		const win = BrowserWindow.fromWebContents(webContents)
		win.setTitle(title)
	})

	ipcMain.handle('dark-mode:toggle', () => {
		if (nativeTheme.shouldUseDarkColors) {
			nativeTheme.themeSource = 'light'
		} else {
			nativeTheme.themeSource = 'dark'
		}
		return nativeTheme.shouldUseDarkColors
	})

	ipcMain.handle('dark-mode:system', () => {
		nativeTheme.themeSource = 'system'
	})
	// Open the DevTools.
	win.webContents.openDevTools()
}
app.whenReady().then(() => {
	ipcMain.handle('dialog:openFile', handleFileOpen)
	ipcMain.on('counter-value', (_event, value) => {
		console.log(value) // will print value to Node console
	})

	createWindow()
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
