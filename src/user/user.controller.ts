/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller, Get, Post, Body, Patch, Param, Delete
} from "@nestjs/common";


import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Post('newUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
