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

    //pega o password e retorna undefined
    return {
      ...createdUser,
      password: undefined
    };
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
