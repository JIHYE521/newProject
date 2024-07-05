function getData() {
	return fetch('/shopping/data/store.json') //
		.then(response => response.json()) //
		.then(data => data.products) //
		.catch(error => {
			console.log('error : ', error);
			throw error;
		});
}

getData() //
	.then(products => {
		//item 생성
		createItem(products);
		filterItem(products);
	}) //
	.catch(error => {
		console.log('error2 : ', error);
	});

//item 생성하기
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

const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.btn-serch');

function filterItem(products) {
	function filterling() {
		const text = searchInput.value;
		const filterProducts = products.filter(item => {
			return item.title.includes(text) || item.brand.includes(text);
		});
		createItem(filterProducts);
	}

	searchBtn.addEventListener('click', filterling);
}
