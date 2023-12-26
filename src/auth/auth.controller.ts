import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('login')
export class AppController {
  constructor(private readonly authService: AuthService) { }
  
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Res() res: Response, @Req() req: Request) {
    const acess_token = await this.authService.login(req.user); 
    const users = {
      ...req.user,
      acess_token
    }
    res.status(HttpStatus.OK).json(users);



    return
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

}