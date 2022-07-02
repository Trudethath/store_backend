import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
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
}
