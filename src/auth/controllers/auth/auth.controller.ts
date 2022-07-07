import {
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
// import { AuthenticatedGuard } from 'src/auth/utils/AuthenticatedGuard';
import { JwtAuthGuard } from 'src/auth/utils/JwtAuthGuard';
import { LocalAuthGuard } from 'src/auth/utils/LocalAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('isAuthorized')
  getAuthorized() {
    return true;
  }
  // @UseGuards(AuthenticatedGuard)
  // @Get('/profile')
  // getHello(@Request() req): string {
  //   return req.user;
  // }

  // @Get('/logout')
  // logout(@Request() req): any {
  //   req.session.destroy();
  //   return { msg: 'The user session has ended' };
  // }
}
