import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/utils/JwtAuthGuard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserAlreadyExistsException } from 'src/users/exceptions/UserAlreadyExists.exception';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAllUsers() {
    const users = await this.usersService.findUsers();
    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/id/:id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const IsEmailTaken = await this.usersService.findUserByEmail(
      createUserDto.email,
    );
    if (!IsEmailTaken) return this.usersService.createUser(createUserDto);
    else throw new UserAlreadyExistsException(); // custom exception
  }

  @Post('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user) {
    if (this.usersService.updateUser(id, user)) {
      throw new HttpException('Successfully updated user info', HttpStatus.OK);
    } else {
      throw new HttpException(
        'Couldnt update user info',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // UPDATE WITH EMAIL
  // @Post('update/:id')
  // @UseGuards(JwtAuthGuard)
  // async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user) {
  //   let updateEmail = true;
  //   const isEmailTaken = await this.usersService.findUserByEmail(user.email);
  //   if (!isEmailTaken) {
  //     updateEmail = true;
  //   } else {
  //     if (isEmailTaken.email === user.email) {
  //       updateEmail = false;
  //     }
  //   }
  //   console.log(updateEmail);
  //   if (this.usersService.updateUser(id, user, updateEmail)) {
  //     throw new HttpException('Successfully updated user info', HttpStatus.OK);
  //   } else {
  //     throw new HttpException(
  //       'Couldnt update user info',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
