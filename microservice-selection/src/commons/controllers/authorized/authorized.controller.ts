import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth() // Agrega el soporte para la autenticación Bearer
@Controller()
export class AuthorizedController {
  constructor() {}
}
