const folderSelector = document.querySelector("#folder-import");

folderSelector.addEventListener("change", (event) => {
	for (let i = 0; i < event.target.files.length; i++) {
		// let s = event.target.files[i].name + '\n';
		// s += event.target.files[i].size + ' Bytes\n';
		// s += event.target.files[i].type + ' Bytes\n';
		const reader = new FileReader();

		reader.readAsText(event.target.files[i])

		reader.addEventListener('load', (e) => {
			const data = e.target.result;
			console.log(data);
		})

	}
});

