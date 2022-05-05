// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// 在上下文隔离启用的情况下使用预加载
const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type])
	}
})

contextBridge.exposeInMainWorld('myAPI', {
	doAThing: () => {
		console.log('doAThing')
	},
	loadPreferences: () => ipcRenderer.invoke('load-prefs'),
})

contextBridge.exposeInMainWorld('electronAPI', {
	setTitle: (title) => ipcRenderer.send('set-title', title),
	openFile: () => ipcRenderer.invoke('dialog:openFile'),
	handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
})

contextBridge.exposeInMainWorld('darkMode', {
	toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
	system: () => ipcRenderer.invoke('dark-mode:system'),
})
