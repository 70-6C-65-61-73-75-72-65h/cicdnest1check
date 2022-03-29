import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistService } from 'src/persist/persist.service';
import { DB_ERRORS } from './constants/errors';
import { ProductDTO } from './types/product.dto';
import { Product } from './types/product.type';

@Injectable()
export class ProductsService {
  constructor(private persist: PersistService) {}

  async product(id: Product['id']): Promise<Product | null> {
    const result = await this.persist.product.findUnique({
      where: { id },
    });

    if (!result) throw new NotFoundException(DB_ERRORS.PRODUCT_WOSNT_FOUND);
    return result;
  }

  async products(): Promise<Product[]> {
    // const { skip, take, cursor, where, orderBy } = params;
    return await this.persist.product.findMany();
  }

  async createproduct(data: ProductDTO): Promise<Product> {
    return await this.persist.product.create({
      data,
    });
  }

  async updateproduct(product: Product, id: Product['id']): Promise<Product> {
    const result = await this.persist.product.update({
      where: {
        id,
      },
      data: {
        ...product,
      },
    });

    if (!result) throw new NotFoundException(DB_ERRORS.PRODUCT_WOSNT_FOUND);
    return result;
  }

  async deleteproduct(id: Product['id']): Promise<Product> {
    return await this.persist.product.delete({
      where: {
        id,
      },
    });
  }
}
