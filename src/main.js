import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement,
  subTotal } from './helpers/shopFunctions';
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

// const subTotal = () => {
//   const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
//   let sum = 0;
//   const total = document.querySelector('.total-price');
//   cart?.forEach(async (e) => {
//     const dados = await fetchProduct(e);
//     sum += dados.base_price;
//     console.log(sum);
//     total.innerHTML = sum.toFixed(2);
//   });
// };

// let sum = 0;
const addcart = async () => {
  await getProducts();
  const getbtn = document.querySelectorAll('.product__add');
  const getId = document.querySelectorAll('.product__id');
  const add = document.querySelector('.cart__products');
  getbtn.forEach((e, i) => e.addEventListener('click', async () => {
    const id = getId[i].innerText;
    saveCartID(id);
    const dados = await fetchProduct(id);
    const cart = createCartProductElement(dados);
    add.appendChild(cart);
    subTotal();
  }));
};

addcart();

const getCartSaved = () => {
  const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
  cart?.forEach(async (e) => {
    const dados = await fetchProduct(e);
    const cartReload = createCartProductElement(dados);
    const add = document.querySelector('.cart__products');
    add.appendChild(cartReload);
  });
};

// const removePrice = async (id) => {
//   const getTotal = JSON.parse(localStorage.getItem('total')) || 0;
//   const product = await fetchProduct(id);
//   const subtracao = getTotal - product.base_price;
//   const total = document.querySelector('.total-price');
//   total.innerHTML = subtracao;
// };

// let sum = 0;
// const subTotal = async () => {
//   const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
//   cart?.forEach(async (e) => {
//     const dados = await fetchProduct(e);
//     const total = document.querySelector('.total-price');
//     sum = parseFloat(total.innerHTML) + dados.base_price;
//     console.log(sum);
//     // console.log(typeof total);
//     // totalPrice.push(dados.base_price);
//     // totalPrice.forEach((element) => {
//     //   sum += element;
//     // });
//     // console.log(totalPrice);
//     // total.innerHTML = parseFloat(sum).toFixed(2);
//     total.innerHTML = sum.toFixed(2);
//   });
//   // const test2 = test.reduce((acc, curr) => {
//   //   acc += curr;
//   //   return acc;
//   // }, 0);
// };

window.onload = () => {
  getCartSaved();
  subTotal();
};
