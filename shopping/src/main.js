function loadItem() {
	return fetch('/shopping/data/products.json')
		.then(response => response.json())
		.then(json => json.products);
}

//Item display
function displayItem(products) {
	const productsContainer = document.querySelector('.products__container ul');
	productsContainer.innerHTML = products.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
	return `
    <li class="product">
      <img src="img/${item.photo}" alt="" />
      <div class="product__info">
        <span class="brand">${item.brand}</span>
        <p class="title">${item.title}</p>
        <p class="price">${item.price}</p>
      </div>
      <div class="product__btn">
        <button type="button" class="btn-add-cart">장바구니</button>
        <button type="button" class="btn-buy-now">바로구매</button>
      </div>
    </li>
  `;
}

//Item Search

const searchBtn = document.querySelector('.btn-search');
const searchInput = document.querySelector('#search');

function searchItem(products) {
	searchBtn.addEventListener('click', () => {
		const searchWord = searchInput.value;
		if (searchWord === '') {
			alert('검색어를 입력하세요.');
			return;
		}
		const result = products.filter(item => item.title.includes(searchWord) || item.brand.includes(searchWord));
		displayItem(result);
	});

	searchInput.addEventListener('keydown', event => {
		const searchWord = searchInput.value;
		if (searchWord === '') {
			alert('검색어를 입력하세요.');
			return;
		}
		if (event.isComposing) {
			return;
		}
		if (event.key === 'Enter') {
			const result = products.filter(item => item.title.includes(searchWord) || item.brand.includes(searchWord));
			displayItem(result);
		}
	});
}

//Item Add Cart

loadItem()
	.then(products => {
		displayItem(products);
		searchItem(products);
	})
	.catch(console.log);
