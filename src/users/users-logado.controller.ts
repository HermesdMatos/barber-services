import { BadRequestException, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

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
  async findOne(@Param('id') id: string) {
    const idvalid = this.authService.validateId(id);
    console.log(idvalid);
    if (!idvalid) {
      throw new BadRequestException('Id inválido'); 
    }
    return await this.usersService.findOne(id);

  }
  
}
