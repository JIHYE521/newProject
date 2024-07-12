function loadItem() {
	return fetch('/shopping/data/products.json')
		.then(response => response.json())
		.then(json => json.products);
}

//Item display
const productsContainer = document.querySelector('.products__container ul');
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

function displayItem(products) {
	productsContainer.innerHTML = products.map(item => createHTMLString(item)).join('');
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
	searchInput.addEventListener('keydown', e => {
		if (e.isComposing) return;
		if (e.key === 'Enter') searchItem(products);
	});
}

// 장바구니 배열 선언
let cart = [];

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

function displayCart(products) {
	const cartContainer = document.querySelector('.cart__drag .products__container');
	cartContainer.innerHTML = '';
	const ul = document.createElement('ul');
	cartContainer.appendChild(ul);
	ul.innerHTML = products.map(item => createCartHTMLString(item)).join('');
}

function addItem(products, itemIndex) {
	const cartAddItem = products.find(item => item.id === +itemIndex);
	const cartItem = cart.find(item => item.id === cartAddItem.id);
	if (cartItem) {
		cartItem.quantity += 1;
	} else {
		cart.push({ ...cartAddItem, quantity: 1 });
	}
	displayCart(cart);
	calculateTotalPrice();
}

function calculateTotalPrice() {
	const displayPrice = document.querySelector('.cart__total > p > span');
	const totalPrice = cart.reduce((total, cartItem) => {
		return total + cartItem.price * cartItem.quantity;
	}, 0);

	displayPrice.innerText = totalPrice.toLocaleString();
}

function setAddCartEventListeners(products) {
	productsContainer.addEventListener('click', e => {
		const target = e.target;
		const addCartBtn = target.parentNode.parentNode;
		const targetItemIndex = addCartBtn.dataset.index;
		if (!target.matches('.btn-add-cart')) {
			return;
		}
		addItem(products, targetItemIndex);
	});
}

function popupToggle() {
	popup.parentNode.classList.toggle('show');
}

const orderBtn = document.querySelector('.btn-order');
orderBtn.addEventListener('click', popupToggle);

const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup form');
const popupSubmit = document.querySelector('.popup__btn-submit');
const popupCancel = document.querySelector('.popup__btn-cancel');

popupForm.addEventListener('submit', e => {
	const popupInputName = document.querySelector('.popup__input-name');
	const popupInputPhone = document.querySelector('.popup__input-phone');
	console.log(popupInputName.value, popupInputPhone.value);
	popupToggle();
	e.preventDefault();
});
popupCancel.addEventListener('click', () => {});

loadItem()
	.then(products => {
		displayItem(products);
		setSearchEventListeners(products);
		setAddCartEventListeners(products);
	})
	.catch(console.log);
