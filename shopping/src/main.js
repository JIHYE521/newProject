function getData() {
	return fetch('/shopping/data/store.json')
		.then(response => response.json())
		.then(data => data.products);
}

getData()
	.then(products => {
		createItem(products);
	})
	.catch(error => {
		console.error(error);
	});

function createItem(products) {
	const ul = document.querySelector('.products ul');

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
