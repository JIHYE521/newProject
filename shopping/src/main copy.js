function getData() {
	return fetch('/shopping/data/store.json')
		.then(response => response.json())
		.then(data => data.products);
}

getData()
	.then(products => {
		createItem(products);
		searchProduct(products);
	})
	.catch(error => {
		console.error(error);
	});

function createItem(products) {
	const ul = document.querySelector('.products ul');

	ul.innerHTML = '';
	products.forEach(item => {
		const li = `
			<li class="product">
				<img src="img/${item.photo}" alt="" />
				<div>
					<span class="brand">${item.brand}</span>
					<p class="title">${item.title}</p>
					<p class="price">${item.price}</p>
				</div>
				<div class="product__btn">
					<button type="button" class="btn-add-cart">장바구니 담기</button>
					<button type="button" class="btn-buy-now">바로구매</button>
				</div>
			</li>
		`;

		ul.insertAdjacentHTML('beforeend', li);
	});
}

// TODO : 검색기능 작업하기 - 7/4
const search = document.querySelector('.search input');
const searchBtn = document.querySelector('.search .btn-serch');

searchBtn.addEventListener('click', e => {
	if (search.value === null || search.value === '') {
		alert('검색어를 입력하세요.');
	}
	searchProduct();
});

function searchProduct(products) {
	const newArr = [];

	products.forEach(item => {
		if (item.title.includes(search.value)) {
			newArr.push(item);
		}
	});

	createItem(newArr);
}
