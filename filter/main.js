// Fetch the Items from the JSON file
function loadItems() {
	return fetch('data/data.json') //
		.then(response => response.json()) //
		.then(json => json.items);
}

// main
loadItems() //
	.then(item => {
		displayItem(item);
		// setEventListeners(item);
	}) //
	.catch(console.log);

const ul = document.querySelector('section ul');

function displayItem(item) {
	item.forEach(item => {
		const li = `
      <li>
        <img src="img/${item.img}" alt="" />
        <span>Gender : ${item.gender}, Size : ${item.size}</span>
      </li>
    `;

		ul.insertAdjacentHTML('beforeend', li);
	});
}
