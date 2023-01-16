export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = (QUERY) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
