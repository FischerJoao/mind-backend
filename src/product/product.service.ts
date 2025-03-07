import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';

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

  async findById(id: number) {
    return await this.prisma.product.findUnique(
      {
        where: { id }
      });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new UnauthorizedError(
        'Produto não encontrado.',
      );
    }
    return await this.prisma.product.update({

      where: { id },
      data: updateProductDto,

    });
  }

  async findByName(name: string) {
    return await this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
