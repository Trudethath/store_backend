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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
}
