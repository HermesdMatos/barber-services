import {
  BadRequestException,
  Body, Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUsersDto } from './dtos/update-users';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersLogadoController {
  constructor(private readonly usersService: UsersService,
    private readonly authService: AuthService) { }
  
  @Get()
  async findAll() {
    return await this.usersService.findall();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    try {
      const idToken = req.user['id'];
      const idvalid = await this.authService.validateId(id);
    if (idvalid.id !== idToken) {
      throw new BadRequestException('Id inválido');
    }
    return await this.usersService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body() data: UpdateUsersDto, @Req() req: Request) {
    try {
      const idToken = req.user['id'];
      const idvalid = await this.authService.validateId(id);   
    if (idvalid.id !== idToken) {
      throw new BadRequestException('Id inválido');
    }
    const emailExist = await this.usersService.findUserByEmail(data.email);    
      if (emailExist && emailExist.id !== id) {
        throw new BadRequestException('Email ja existe');
      }
    
    const pass = await bcrypt.hash(data.password, 10)
    return await this.usersService.update(id, {...data, password: pass});
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      const idToken = req.user['id'];      
      const idvalid = await this.authService.validateId(id);      
    if (idvalid.id !== idToken) {
      throw new BadRequestException('Id inválido');
    }
    return await this.usersService.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
