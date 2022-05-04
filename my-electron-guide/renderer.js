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
