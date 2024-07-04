fetch('/shopping/data/store.json') //
	.then(response => response.json()) //
	.then(data => {
		const products = data.products;
		products.forEach(product => {
			console.log(product.id, product.title, product.brand, product.price);
		});
	}) //
	.catch(error => console.error());

// TODO 1. 상품 목록 뿌리기
// TODO 2. 검색기능
// TODO 3. 장바구니 : 드래그 해서 담기, 구매버튼 눌러도, 같은 상품이면 수량만 증가
// TODO 4. 구매하기 : 장바구니에서 수량 변경 가능, 모든 상품과 최종 금액 출력, 구매하기 누르면 개인정보 입력창(모달)
// TODO 5. 구매후 : 완료 누르면 영수증 이미지로(캔버스), 날짜, 모든 상품, 금액, 총합계
