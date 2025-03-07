import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }


  async create(createProductDto: CreateProductDto) {

    const data = {
      ...createProductDto,
    };

    const createProduct = await this.prisma.product.create({
      data
    });

    return {
      ...createProduct,
    }
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique(
      {
        where: { id }
      });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
