const items = document.querySelector('.list__contents');
const form = document.querySelector('.list__form');
const input = document.querySelector('.form__input');
const addBtn = document.querySelector('.form__btn');

form.addEventListener('submit', e => {
	e.preventDefault();
	onAdd();
});

let id = 1;
function createItem(itemText) {
	const li = document.createElement('li');
	li.setAttribute('class', 'item');
	li.setAttribute('data-id', id);
	li.innerHTML = `
    <input type="checkbox" name="" id="" class="item__checkbox" />
    <p class="item__text">${itemText}</p>
    <button type="button" class="item__btn-delete">삭제</button>
  `;
	id++;
	return li;
}

function onAdd() {
	const itemText = input.value;
	if (itemText === '') {
		input.focus();
		return;
	}
	const item = createItem(itemText);
	items.appendChild(item);
	input.value = '';
	input.focus();
}

items.addEventListener('click', e => {
	if (!e.target.matches('.item__btn-delete')) return;
	const targetId = e.target.parentNode.dataset.id;
	const removeTarget = document.querySelector(`li[data-id='${targetId}']`);
	removeTarget.remove();
});

addBtn.addEventListener('click', () => {
	onAdd();
});

input.addEventListener('keydown', e => {
	//keyup
	if (e.isComposing) {
		return;
	}
	if (e.key === 'Enter') {
		onAdd();
	}
});
