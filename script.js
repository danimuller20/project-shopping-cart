function Loading() {
  const loading = document.createElement('p');
  loading.innerText = 'Loading . . .';
  loading.className = 'loading';
  document.body.appendChild(loading);
}

function StopLoading() {
  const loading = document.querySelector('.loading');
  loading.remove();
}

function saveCart() {
  const cartItems = document.querySelector('ol.cart__items');
  localStorage.setItem('cartItems', cartItems.innerHTML);
}

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

function cartItemClickListener(event) {
  event.target.remove();
  saveCart();
  sumAllItems();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addingProductToShoppingCartbyID(ItemID) {
  fetch(`https://api.mercadolibre.com/items/${ItemID}`).then((response) => {
    response.json()
      .then((element) => {
        const productInfo = {
          ...element,
          sku: element.id,
          name: element.title,
          salePrice: element.price,
        };
        const addTocart = createCartItemElement(productInfo);
        document.querySelector('.cart__items').appendChild(addTocart);
        saveCart();
        sumAllItems();
      });
  });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', (event) => {
    addingProductToShoppingCartbyID(event.target.parentNode.firstChild.innerText);
  });
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function retrieveMercadoLivreResults(QUERY) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  Loading();
  const response = await fetch(endpoint);
  const object = await response.json();
  const results = object.results;
  const itemsElement = document.querySelector('.items');
  results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const element = createProductItemElement({ sku, name, image });
    itemsElement.appendChild(element);
  });
  StopLoading();
}

function sumAllItems() {
  let price = 0;
  const totalPrice = document.querySelector('.total-price');
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach(item => (price += parseFloat(item.innerText.split('$')[1])));
  totalPrice.innerText = `Total : ${price}`;
}

function removingList() {
  const ClearAll = document.querySelector('.empty-cart');
  ClearAll.addEventListener('click', () => {
    const cartItems = document.querySelector('.cart__items');
    cartItems.innerText = '';
    saveCart();
    sumAllItems();
  });
}

function loadCart() {
  const cartItems = document.querySelector('ol.cart__items');
  cartItems.innerHTML = localStorage.getItem('cartItems');
  const CartList = document.querySelectorAll('.cart__item');
  CartList.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
    sumAllItems();
  });
}

window.onload = function onload() {
  retrieveMercadoLivreResults('computador');
  removingList();
  loadCart();
};
