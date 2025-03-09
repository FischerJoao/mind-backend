/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    //pegando as propriedades do createUserDto
    //async pois tem que esperar o bcrypt 
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    };

    //retorna promise
    const createdUser = await this.prisma.user.create({
      data
    });

    return {
      ...createdUser,
      password: undefined
    };
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
}