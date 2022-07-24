import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      const matched = comparePasswords(password, user.password);
      if (matched) return user;
      else return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      userId: user.id,
    };
  }

  async getProfileInfo(id: number) {
    const user = await this.usersService.findUserById(id);
    return user;
  }
}
