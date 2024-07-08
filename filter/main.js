// Fetch the Items from the JSON file
function loadItems() {
	return fetch('data/data.json') //
		.then(response => response.json()) //
		.then(json => json.items);
}

function displayItem(items) {
	const ul = document.querySelector('section ul');
	ul.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
	return `
    <li>
      <img src="img/${item.img}" alt="" />
      <span>Gender : ${item.gender}, Size : ${item.size}</span>
    </li>
  `;
}

// main
loadItems() //
	.then(items => {
		displayItem(items);
		// setEventListeners(items);
	}) //
	.catch(console.log);

// function displayItem(item) {
// 	const ul = document.querySelector('section ul');
// 	ul.innerHTML = '';
// 	item.forEach(item => {
// 		const li = `
//       <li>
//         <img src="img/${item.img}" alt="" />
//         <span>Gender : ${item.gender}, Size : ${item.size}</span>
//       </li>
//     `;

// 		ul.insertAdjacentHTML('beforeend', li);
// 	});
// }

// function setEventListeners(item) {
// 	const btns = document.querySelector('.btns');

// 	btns.addEventListener('click', e => {
// 		// console.log(e.target);
// 		if (e.target.matches('.btn-color')) {
// 			const color = e.target.dataset.color;
// 			let filterItem = item.filter(item => item.color === color);
// 			displayItem(filterItem);
// 		} else if (e.target.matches('.btn-img img')) {
// 			const category = e.target.parentNode.dataset.category;
// 			filterItem = item.filter(item => item.type === category);
// 			displayItem(filterItem);
// 		}
// 	});

// 	const btnRefresh = document.querySelector('.btn-refresh');
// 	btnRefresh.addEventListener('click', () => displayItem(item));
// }
