import { HttpException, HttpStatus } from '@nestjs/common';

export class UserLoginErrorException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
