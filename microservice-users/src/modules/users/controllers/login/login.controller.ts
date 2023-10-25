import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from '../../dto/login.dto';
import { UsersService } from '../../services/users.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ExceptionDto } from '../../../../commons/filters/http-exception.filter';

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Datos de autenticación exitosos', type: LoginResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: ExceptionDto })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Prohibido', type: ExceptionDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor',
    type: ExceptionDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.userService.login(loginDto);
  }
}
