import { createProductElement } from './shopFunctions';

const addcart = document.querySelector('.cart__products');

export const fetchProduct = async (ProductID) => {
  if (!ProductID) {
    throw new Error('ID não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/items/${ProductID}`);
  const dados = await response.json();
  const cart = createProductElement(dados);
  console.log(cart);
  addcart.appendChild(cart);
  return dados;
};

export const fetchProductsList = async (QUERY) => {
  if (!QUERY) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  const dados = await response.json();
  return dados.results;
};
