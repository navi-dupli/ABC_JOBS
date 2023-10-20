import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../../dto/login.dto';
import { UsersService } from '../../services/users.service';

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
