import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersLogadoController } from './users-logado.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController, UsersLogadoController],
  providers: [UsersService, AuthService, JwtService],
})
export class UsersModule {}
