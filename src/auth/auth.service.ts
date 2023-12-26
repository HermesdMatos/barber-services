import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }

  async validateUser(email: string): Promise<any> {
    const userEmail = await this.usersService.findUserByEmail(email);
    
    if (userEmail) {
      const { password, ...result } = userEmail;
      return result;
    }
    return null;
  }
  async validateId(id: string) {
    const user = await this.usersService.findOne(id);
    
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, email: user.email, id: user.id };
    return this.jwtService.sign(payload)
  }

}
