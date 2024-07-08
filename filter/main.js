// Fetch the Items from the JSON file
function loadItems() {
	return fetch('data/data.json') //
		.then(response => response.json()) //
		.then(json => json.items);
}

// 목록 업데이트
function displayItem(items) {
	const ul = document.querySelector('section ul');
	ul.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// HTML 생성
function createHTMLString(item) {
	return `
    <li>
      <img src="img/${item.img}" alt="" />
      <span>Gender : ${item.gender}, Size : ${item.size}</span>
    </li>
  `;
}

function onButtonClick(event, items) {
	const dataset = event.target.dataset;
	const key = dataset.key;
	const value = dataset.value;
	if (key === null || value === null) {
		return;
	}
	const filterItem = items.filter(item => item[key] === value);
	displayItem(filterItem);
}

function setEventListeners(items) {
	const btnReset = document.querySelector('.btn-refresh');
	const btns = document.querySelector('.btns');

	btnReset.addEventListener('click', () => displayItem(items));
	btns.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems() //
	.then(items => {
		displayItem(items);
		setEventListeners(items);
	}) //
	.catch(console.log);

// 전체 재생성보다 필터링 된 아이템들만 클래스 붙여서 노출시키기..
