import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'User already exists!', status || HttpStatus.CONFLICT);
  }
}
