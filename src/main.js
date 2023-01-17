import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = document.querySelector('.products');

const createLoading = () => {
  const paragraph = document.createElement('p');
  paragraph.className = 'loading';
  paragraph.innerText = 'carregando...';
  products.appendChild(paragraph);
};

const createError = () => {
  const paragraph = document.createElement('p');
  paragraph.className = 'error';
  paragraph.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  products.appendChild(paragraph);
};

const getProducts = async () => {
  try {
    createLoading();
    const product = await fetchProductsList('computador');
    product.forEach((e) => {
      const data = createProductElement(e);
      products.appendChild(data);
    });
    const delParagraph = document.querySelector('.loading');
    delParagraph.remove();
  } catch (error) {
    createError();
  }
};

const addcart = async () => {
  await getProducts();
  const getbtn = document.querySelectorAll('.product__add');
  const getId = document.querySelectorAll('.product__id');
  getbtn.forEach((e, i) => e.addEventListener('click', async () => {
    const id = getId[i].innerText;
    saveCartID(id);
    const dados = await fetchProduct(id);
    const cart = createCartProductElement(dados);
    const add = document.querySelector('.cart__products');
    add.appendChild(cart);
  }));
};

addcart();

const getCartSaved = () => {
  const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
  cart?.forEach(async (e) => {
    const dados = await fetchProduct(e);
    const cartReload = createCartProductElement(dados);
    // console.log(dados);
    const add = document.querySelector('.cart__products');
    add.appendChild(cartReload);
  });
};

window.onload = () => {
  getCartSaved();
};
