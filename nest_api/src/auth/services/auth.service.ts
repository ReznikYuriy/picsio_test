import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { compare } from 'bcryptjs';
import configs from 'src/configs';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, configs.jwt);
    return {
      isAuthorized: true,
      accessToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const checker = await compare(password, user.password);

    if (!checker) {
      return null;
    }

    return user;
  }
}
