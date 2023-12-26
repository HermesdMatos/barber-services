import { BadRequestException, Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUsersDto from './dtos/create-users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post()
  async createUser(@Body() data: CreateUsersDto) {

    const emailExist = await this.usersService.findUserByEmail(data.email)
    if (emailExist) {
      throw new BadRequestException('Email ja existe');
    }
    return await this.usersService.createUser(data);
  }
}
