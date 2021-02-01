

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
  console.log(section);
  return section;
}



function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} 

function cartItemClickListener() {
  // coloque seu código aqui
  const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
  return new Promise((resolve, reject) => {
    fetch(endpoint)
    .then((response) => response.json())
    .then((object) => {
      if (object.error) {
        throw new Error(object.error);
      }
      const { results } = object;
      createProductItemElement(results);
      console.log(object);
      resolve();
    })
    .catch((error) => {
      window.alert(error);
      reject();
    });
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

cartItemClickListener();

//window.onload = () => { cartItemClickListener(); }