function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(events) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const fetchListApi = async () => {
  const apiUrl = `https://api.mercadolibre.com/sites/MLB/search?q=computador`

  try {
    const response = await fetch(apiUrl);
    const object = await response.json();
    object.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
      const appendItem = document.querySelector('.items');
      console.log(appendItem);
      const element = createProductItemElement({ sku, name, image });
      appendItem.appendChild(element);
    })

  } catch (error) {
    window.alert(error);
  }

}

window.onload = function onload() {
  fetchListApi();
};
