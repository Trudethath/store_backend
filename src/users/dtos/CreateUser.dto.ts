import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  created_at: string;
  updated_at: string;
}
