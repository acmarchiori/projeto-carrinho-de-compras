import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561'); 
  });

  it('fetchProduct com o argumento "MLB1405519561" é uma estrutura de dados igual ao objeto product', async () => {
    expect(await fetchProduct('MLB1405519561')).toEqual(product); 
  });

  it('ao chamar a função fetchProduct sem argumento, retorna um erro ', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
