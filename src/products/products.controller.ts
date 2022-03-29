import { ProductsService } from './products.service';
import { ProductDTO } from './types/product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './types/product.type';

@Controller('product')
export class ProductsController {
  constructor(private readonly productSerive: ProductsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getproducts(): Promise<Product[]> {
    return this.productSerive.products();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getproduct(
    @Param('id', ParseIntPipe) productId: Product['id'],
  ): Promise<Product> {
    return this.productSerive.product(productId);
  }
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  updateproduct(
    @Param('id', ParseIntPipe) productId: Product['id'],
    @Body() dto: Product,
  ): Promise<Product> {
    return this.productSerive.updateproduct(dto, productId);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteproduct(
    @Param('id', ParseIntPipe) productId: Product['id'],
  ): Promise<Product> {
    return this.productSerive.deleteproduct(productId);
  }
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createproduct(@Body() dto: ProductDTO): Promise<Product> {
    return this.productSerive.createproduct(dto);
  }
}
