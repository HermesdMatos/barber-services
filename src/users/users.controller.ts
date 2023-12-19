import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUsersDto from './dtos/create-users';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post()
  async createUser(@Body() data: CreateUsersDto, @Res() res: Response) {

    const emailExist = await this.usersService.findUserByEmail(data.email)
    if (emailExist) {
      throw new BadRequestException('Email ja existe');
    }
    const user = await this.usersService.createUser(data);
    return res.status(HttpStatus.CREATED).json(user);
  }
}
