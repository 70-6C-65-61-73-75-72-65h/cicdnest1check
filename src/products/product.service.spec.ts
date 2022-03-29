import { PersistService } from '../persist/persist.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import {
  createProductDBRequest,
  createProductDTO,
  deleteProductDBRequest,
  getMockProduct,
  getProductDBRequest,
  invalidProductId,
  operatedProductId,
  resolvedCreateProductValue,
  resolvedGetProductsValue,
} from './constants/test';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let productService: ProductsService;
  let productRepo;
  const mockProdutRepo = () => ({
    product: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PersistService,
          useFactory: mockProdutRepo,
        },
      ],
    }).compile();
    productService = module.get<ProductsService>(ProductsService);
    productRepo = module.get<PersistService>(PersistService);
  });

  describe('createProduct', () => {
    it('should save a product in the db', async () => {
      productRepo.product.create.mockResolvedValue(resolvedCreateProductValue);
      expect(productRepo.product.create).not.toHaveBeenCalled();
      const result = await productService.createproduct(createProductDTO);
      expect(productRepo.product.create).toHaveBeenCalledWith(
        createProductDBRequest,
      );
      expect(result).toEqual(resolvedCreateProductValue);
    });
  });

  describe('getProducts', () => {
    it('should get All Products', async () => {
      productRepo.product.findMany.mockResolvedValue(resolvedGetProductsValue);
      expect(productRepo.product.findMany).not.toHaveBeenCalled();
      const result = await productService.products();
      expect(productRepo.product.findMany).toHaveBeenCalled();
      expect(result).toEqual(resolvedGetProductsValue);
    });
  });

  describe('getProduct', () => {
    it('should retrieve a product with an ID', async () => {
      productRepo.product.findUnique.mockResolvedValue(getMockProduct);
      const result = await productService.product(operatedProductId);
      expect(result).toEqual(getMockProduct);
      expect(productRepo.product.findUnique).toHaveBeenCalledWith(
        getProductDBRequest,
      );
    });

    it('throws an error as a product is not found', async () => {
      productRepo.product.findUnique.mockResolvedValue(null);
      await expect(productService.product(invalidProductId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', async () => {
      productRepo.product.delete.mockResolvedValue(operatedProductId);
      expect(productRepo.product.delete).not.toHaveBeenCalled();
      await productService.deleteproduct(operatedProductId);
      expect(productRepo.product.delete).toHaveBeenCalledWith(
        deleteProductDBRequest,
      );
    });
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });
});
