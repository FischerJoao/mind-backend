import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @Post('NewProduct')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }


  @Patch('upload/:id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      }
    })
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ) {
    if (!file) {
      throw new Error('Nenhum arquivo enviado');
    }

    const imageUrl = `/uploads/${file.filename}`;
    const updatedProduct = await this.productService.updateProductImageById(id, imageUrl);

    return {
      message: 'Imagem enviada e URL salva no banco!',
      product: updatedProduct,
    };
  }




  @Get('AllProducts')
  findAll() {
    return this.productService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Get('ProductByName/:name')
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Patch('updateProduct/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }


  @Delete('deleteProduct/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
