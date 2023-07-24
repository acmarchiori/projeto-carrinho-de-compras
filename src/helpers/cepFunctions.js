const errorMessage = 'CEP não encontrado';

export const getAddress = async (CEP) => {
  const API1 = fetch(`https://cep.awesomeapi.com.br/json/${CEP}`);
  const API2 = fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}`);
  const cepAddress = await Promise.any([API1, API2]);
  const handledAddress = await cepAddress.json();
  if (handledAddress.code === 'invalid' || handledAddress.code === 'not_found') {
    throw new Error(errorMessage);
  }
  return handledAddress;
};

export const searchCep = async () => {
  const cartAddress = document.querySelector('.cart__address');
  try {
    const input = document.querySelector('.cep-input');
    const address = await getAddress(input.value);
    cartAddress.innerHTML = `${address.street || address.address} - ${address.neighborhood
      || address.district} - ${address.city} - ${address.state}`;
  } catch (error) {
    cartAddress.innerHTML = errorMessage;
  }
};
