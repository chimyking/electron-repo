window.myAPI.doAThing()

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
	const title = titleInput.value
	window.electronAPI.setTitle(title)
})

const btn1 = document.getElementById('btn1')
const filePathElement = document.getElementById('filePath')

btn1.addEventListener('click', async () => {
	const filePath = await window.electronAPI.openFile()
	filePathElement.innerText = filePath
})

const counter = document.getElementById('counter')

window.electronAPI.handleCounter((event, value) => {
	const oldValue = Number(counter.innerText)
	const newValue = oldValue + value
	counter.innerText = newValue
	event.sender.send('counter-value', newValue)
})

document
	.getElementById('toggle-dark-mode')
	.addEventListener('click', async () => {
		const isDarkMode = await window.darkMode.toggle()
		document.getElementById('theme-source').innerHTML = isDarkMode
			? 'Dark'
			: 'Light'
	})

document
	.getElementById('reset-to-system')
	.addEventListener('click', async () => {
		await window.darkMode.system()
		document.getElementById('theme-source').innerHTML = 'System'
	})

async function testIt() {
	const device = await navigator.bluetooth.requestDevice({
		acceptAllDevices: true,
	})
	document.getElementById('device-name').innerHTML =
		device.name || `ID: ${device.id}`
}

document.getElementById('clickme').addEventListener('click', testIt)

async function testIt1() {
	const grantedDevices = await navigator.hid.getDevices()
	let grantedDeviceList = ''
	grantedDevices.forEach((device) => {
		grantedDeviceList += `<hr>${device.productName}</hr>`
	})
	document.getElementById('granted-devices').innerHTML = grantedDeviceList
	const grantedDevices2 = await navigator.hid.requestDevice({
		filters: [],
	})

	grantedDeviceList = ''
	grantedDevices2.forEach((device) => {
		grantedDeviceList += `<hr>${device.productName}</hr>`
	})
	document.getElementById('granted-devices2').innerHTML = grantedDeviceList
}

document.getElementById('clickme1').addEventListener('click', testIt1)
