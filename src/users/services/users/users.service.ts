import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Returns all users
  findUsers() {
    const users = this.userRepository.find();
    return users;
  }

  // Finds user by his id
  findUserById(id: number) {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }

  findUserByUsername(username: string) {
    const user = this.userRepository.findOneBy({ username });
    return user;
  }

  findUserByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  // Creates user with hashed password and dates
  createUser(createUserDto: CreateUserDto) {
    const date = new Date().toLocaleDateString();
    const userCopy = createUserDto;
    userCopy.password = encodePassword(createUserDto.password);
    userCopy.created_at = date;
    userCopy.updated_at = date;
    return this.userRepository.save(userCopy);
  }
}
