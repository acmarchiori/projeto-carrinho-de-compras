import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');

const getProducts = async () => {
  const product = await fetchProductsList('computador');
  product.forEach((e) => {
    const data = createProductElement(e);
    console.log(data);
    products.appendChild(data);
  });
};
getProducts();
