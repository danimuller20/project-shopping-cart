window.onload = function onload() {};

function createLoading() {
  const createLoadingText = document.createElement("p");
  createLoadingText.className = "loading";
  createLoadingText.innerTEXT = "loading...";
  document.body.appendChild(createLoadingText);
}

function loadCart() {
  const cart = document.getElementsByClassName("cart_items");
  cart.innerHTML = localStorage.getItem("cart");
}

function saveCart() {
  const getCartList = document.getElementsByClassName("cart_items");
  localStorage.setItem("cart", getCartList.innerHTML);
}

function stopLoading() {
  const getLoading = document.getElementsByClassName("loading");
  getLoading.remove();
}

function createProductImageElement(imageSource) {
  const img = document.createElement("img");
  img.className = "item__image";
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
  const section = document.createElement("section");
  section.className = "item";

  section.appendChild(createCustomElement("span", "item__sku", sku));
  section.appendChild(createCustomElement("span", "item__title", name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement("button", "item__add", "Adicionar ao carrinho!")
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector("span.item__sku").innerText;
}

function cartItemClickListener(event) {
  // coloque seu código e seja feliz
  /* event.target.remove();
  saveCart();
  */
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement("li");
  li.className = "cart__item";
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener("click", cartItemClickListener);
  return li;
}

function addCart() {
  const items = document.getElementsByClassName("items");
  items.addEventListener("click", async (event) => {
    const getSku = getSkuFromProductItem(event.target.parentNode);
    const endpoint = `https://api.mercadolibre.com/items/${mySku}`;
    const response = await fetch(endpoint).then((respo) => respo.json());
    const item = {
      sku: getSku,
      name: response.title,
      salePrice: response.price,
    };
    const cartItems = document.getElementsByClassName("cart_items");
    const createCartItem = createCartItemElement(item);
    cartItems.appendChild(createCartItem);
    saveCart();
  });
}

async function getResults() {
  const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
  createLoading();
  const response = await fetch(endpoint);
  const object = await response.json();
  const results = object.results;
  const itemsElement = document.getElementsByClassName("items");

  results.forEach((result) => {
    const obj = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    const element = createProductItemElement(obj);
    itemsElement.appendChild(element);
  });
  stopLoading();
}

function emptyCart() {
  clearButton = document.getElementsByClassName("empty-cart");
  clearButton.addEventListener("click", () => {
    document.getElementsByClassName("cart_items").innerHTML = "";
    saveCart();
  });
}

window.onload = () => {
  addCart();
  getResults();
  emptyCart();
  loadCart();
};
