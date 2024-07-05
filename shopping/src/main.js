function getData() {
	return fetch('/shopping/data/store.json')
		.then(response => response.json())
		.then(data => data.products)
		.catch(error => {
			console.log('error : ', error);
			throw error;
		});
}

getData()
	.then(products => {
		createItem(products, productContainer);
		filterItem(products);
		addCart(products);
	})
	.catch(error => {
		console.log('error2 : ', error);
	});

const productContainer = document.querySelector('.products__container');
//item 생성하기
function createItem(products, productContainer) {
	productContainer.innerHTML = '';
	products.forEach(item => {
		const div = `
			<div class="product" data-index=${item.id}>
				<img src="img/${item.photo}" alt="" />
				<div>
					<span class="brand">${item.brand}</span>
					<p class="title">${item.title}</p>
					<p class="price">₩${item.price}</p>
				</div>
				<div class="product__btn">
					<button type="button" class="btn-add-cart">장바구니</button>
					<button type="button" class="btn-buy-now">바로구매</button>
				</div>
			</div>
		`;

		productContainer.insertAdjacentHTML('beforeend', div);
	});
}

function cartItem(products, productContainer) {
	productContainer.innerHTML = '';
	products.forEach(item => {
		const div = `
			<div class="product" data-index=${item.id}>
				<img src="img/${item.photo}" alt="" />
				<div>
					<span class="brand">${item.brand}</span>
					<p class="title">${item.title}</p>
					<p class="price">₩${item.price}</p>
				</div>
				<div class="product__count">${item.quantity}</div>
			</div>
		`;

		productContainer.insertAdjacentHTML('beforeend', div);
	});
}

// 검색
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.btn-serch');

function filterItem(products) {
	function filtering() {
		const text = searchInput.value;
		const filterProducts = products.filter(item => {
			return item.title.includes(text) || item.brand.includes(text);
		});
		createItem(filterProducts, productContainer);
	}

	searchBtn.addEventListener('click', filtering);
}

// 장바구니 담기
function addCart(products) {
	const cart = document.querySelector('.cart__drag');
	let cartProducts = [];

	productContainer.addEventListener('click', e => {
		const target = e.target;
		const targetParent = target.parentNode.parentNode;
		const prdIndex = target.parentNode.parentNode.dataset.index;

		// 클릭하면 담기
		if (target.matches('.btn-add-cart')) {
			cartProducts = products.filter(item => item.id === +prdIndex);
			cartItem(cartProducts, cart);
		}

		console.log(cartProducts);
		// 담은거에서 중복확인하기
	});
}
