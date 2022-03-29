import { ProductDTO } from '../types/product.dto';

export const resolvedCreateProductValue = 'testProduct';
export const resolvedGetProductsValue = 'testProducts';
export const createProductDTO: ProductDTO = {
  name: 'test name',
  price: '10$',
};
export const getMockProduct = {
  name: 'Test name',
  description: 'Test description',
  price: 'Test price',
};
export const createProductDBRequest = { data: createProductDTO };
export const operatedProductId = 1;
export const invalidProductId = 1;
export const deleteProductDBRequest = { where: { id: operatedProductId } };
export const getProductDBRequest = { where: { id: operatedProductId } };
