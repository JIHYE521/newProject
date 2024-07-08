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
//Item Add Cart

loadItem()
	.then(products => {
		// console.log(products);
		displayItem(products);
	})
	.catch(console.log);
