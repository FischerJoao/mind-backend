import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @Post('NewProduct')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }


  @Get('AllProducts')
  findAll() {
    return this.productService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @Get('ProductByName/:name')
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Patch('updateProduct/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }


  @Delete('deleteProduct/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
