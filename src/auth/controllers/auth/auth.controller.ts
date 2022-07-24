import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/utils/JwtAuthGuard';
import { SerializedUser } from 'src/users/types';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  async getProfileInfo(@Param('id') id: number) {
    const userProfile = await this.authService.getProfileInfo(id);
    if (userProfile) return new SerializedUser(userProfile);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }
}
