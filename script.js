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

function removeAllItemsCart() {
  const removeButton = document.querySelector('.empty-cart');
  removeButton.addEventListener('click', () => {
    const ol = document.querySelector('.cart__items');
    ol.innerHTML = '';
  });
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function fetchAPIMercadoLivre(search) {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const classItemsQs = document.querySelector('.items');

  try {
    const fetchEndPoint = await fetch(endPoint);
    const promisseObject = await fetchEndPoint.json();
    const results = promisseObject.results;
    results.forEach(({ id: sku, title: name, thumbnail: image }) => {
      const productsItems = createProductItemElement({ sku, name, image });
      classItemsQs.appendChild(productsItems);
    });
    clickToAddButton();
    if (promisseObject.error) {
      throw new Error(promisseObject.error);
    }
  } catch (error) {
    window.alert(error);
  }

}

async function clickToAddButton() {
  const itemList = document.querySelector('.cart__items');
  const itemButtonAdd = document.querySelectorAll('.item__add');
  itemButtonAdd
    .forEach(buttonItem => (buttonItem)
      .addEventListener('click', async(event) => {
    const productId = getSkuFromProductItem(event.path[1]);
    const productEndPoint = `https://api.mercadolibre.com/items/${productId}`;
    const fetchEndPointProduct = await fetch(productEndPoint);
    const promisseObject = await fetchEndPointProduct.json();
    const { id: sku, title: name, price: salePrice } = promisseObject;
    const objectItem = createCartItemElement({ sku, name, salePrice });
    itemList.appendChild(objectItem);
  }));
}


window.onload = function onload() {
  fetchAPIMercadoLivre('computador');
  removeAllItemsCart();
};
