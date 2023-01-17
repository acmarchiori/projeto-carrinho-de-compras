import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const container = document.querySelector('.container');

const createLoading = () => {
  const paragraph = document.createElement('p');
  paragraph.className = 'loading';
  paragraph.innerText = 'carregando...';
  products.appendChild(paragraph);
};

const getProducts = async () => {
  createLoading();
  const product = await fetchProductsList('computador');
  product.forEach((e) => {
    const data = createProductElement(e);
    products.appendChild(data);
  });
  const delParagraph = document.querySelector('.loading');
  delParagraph.remove();
};
getProducts();
