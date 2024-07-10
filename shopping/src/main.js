function loadItem() {
	return fetch('/shopping/data/products.json')
		.then(response => response.json())
		.then(json => json.products);
}

//Item display
const productsContainer = document.querySelector('.products__container');
function displayItem(products) {
	const ul = document.createElement('ul');
	productsContainer.appendChild(ul);
	ul.innerHTML = products.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
	return `
    <li class="product" data-index=${item.id}>
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
	const searchWord = searchInput.value.trim();
	if (searchWord === '') {
		alert('검색어를 입력하세요.');
		return;
	}
	const result = products.filter(item => item.title.includes(searchWord) || item.brand.includes(searchWord));
	displayItem(result);
}

function setSearchEventListeners(products) {
	searchBtn.addEventListener('click', () => {
		searchItem(products);
	});
	searchInput.addEventListener('keydown', event => {
		if (event.isComposing) return;
		if (event.key === 'Enter') searchItem(products);
	});
}

// 장바구니 배열 선언
let cart = [];

// 장바구니 담기
function addItem(products, itemIndex) {
	const newArray = products.find(item => item.id === +itemIndex);
	const cartItem = cart.find(item => item.id === newArray.id);
	if (cartItem) {
		cartItem.quantity += 1;
	} else {
		cart.push({ ...newArray, quantity: 1 });
	}
	displayCart(cart);
}

function displayCart(products) {
	const cartContainer = document.querySelector('.cart__drag .products__container');
	cartContainer.innerHTML = '';
	const ul = document.createElement('ul');
	cartContainer.appendChild(ul);
	ul.innerHTML = products.map(item => createCartHTMLString(item)).join('');
}

function createCartHTMLString(item) {
	return `
    <li class="product" data-index=${item.id}>
      <img src="img/${item.photo}" alt="" />
      <div class="product__info">
        <span class="brand">${item.brand}</span>
        <p class="title">${item.title}</p>
        <p class="price">${item.price}</p>
      </div>
			<div class="product__quantity">
				<input type="text" disabled value=${item.quantity} />
			</div>
    </li>
  `;
}

function setAddCartEventListeners(products) {
	productsContainer.addEventListener('click', event => {
		const addCartBtn = event.target.parentNode.parentNode;
		const targetItemIndex = addCartBtn.dataset.index;
		addItem(products, targetItemIndex);
	});
}

loadItem()
	.then(products => {
		displayItem(products);
		setSearchEventListeners(products);
		setAddCartEventListeners(products);
	})
	.catch(console.log);
