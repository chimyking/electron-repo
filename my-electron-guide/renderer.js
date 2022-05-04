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
