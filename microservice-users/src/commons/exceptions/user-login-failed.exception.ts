import { HttpException, HttpStatus } from '@nestjs/common';

export class UserLoginFailedException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
