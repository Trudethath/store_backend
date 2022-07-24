import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, User as UserEntity } from 'src/typeorm';
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

  async updateUser(id: number, user: User) {
    const findUser = await this.userRepository.findOneBy({ id });
    const date = new Date().toLocaleDateString();
    if (findUser) {
      if (user.username !== '') findUser.username = user.username;
      if (user.address1 !== '') findUser.address1 = user.address1;
      if (user.address2 !== '') findUser.address2 = user.address2;
      if (user.city !== '') findUser.city = user.city;
      if (user.stateOrProvince !== '')
        findUser.stateOrProvince = user.stateOrProvince;
      if (user.zipOrPostalCode !== '')
        findUser.zipOrPostalCode = user.zipOrPostalCode;
      if (user.country !== '') findUser.country = JSON.stringify(user.country);
      findUser.updated_at = date;
    }
    return this.userRepository.save(findUser);
  }
}
