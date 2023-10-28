import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsNotEmpty()
  public password: string;
}

export class Auth0RequestLoginDto {
  public grant_type: string;
  public username: string;
  public password: string;
  public audience: string;
  public client_id: string;
  public client_secret: string;

  static fromLoginDto(loginDto: LoginDto): Auth0RequestLoginDto {
    const auth0RequestLoginDto = new Auth0RequestLoginDto();
    auth0RequestLoginDto.grant_type = 'password';
    auth0RequestLoginDto.username = loginDto.email;
    auth0RequestLoginDto.password = loginDto.password;
    auth0RequestLoginDto.audience = process.env.AUTH0_AUDIENCE;
    auth0RequestLoginDto.client_id = process.env.AUTH0_AUTH_CLIENT_ID;
    auth0RequestLoginDto.client_secret = process.env.AUTH0_AUTH_CLIENT_SECRET;
    return auth0RequestLoginDto;
  }
}
export class Auth0ResponseLoginDto {
  @ApiProperty({ description: 'Token de acceso', example: 'access_token_here' })
  public access_token: string;

  @ApiProperty({ description: 'Tiempo de expiración en segundos', example: 3600 })
  public expires_in: number;

  @ApiProperty({ description: 'Tipo de token', example: 'Bearer' })
  public token_type: string;
}

export class LoginResponseDto extends Auth0ResponseLoginDto {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombres del usuario', example: 'John' })
  names: string;

  @ApiProperty({ description: 'Apellidos del usuario', example: 'Doe' })
  surnames: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'ID de autenticación', example: 'auth_id_here' })
  authId: string;

  @ApiProperty({ description: 'URL de la imagen del usuario', example: 'https://example.com/user.jpg' })
  picture: string;

  @ApiProperty({ description: 'Rol del usuario', example: 'user' })
  rol: string;

  @ApiProperty({ description: 'ID de la empresa', example: 'company_id_here' })
  company_id: string;
  static fromAuth0ResponseLoginDto(auth0ResponseLoginDto: Auth0ResponseLoginDto, user: User): LoginResponseDto {
    const loginResponseDto = new LoginResponseDto();
    loginResponseDto.access_token = auth0ResponseLoginDto.access_token;
    loginResponseDto.expires_in = auth0ResponseLoginDto.expires_in;
    loginResponseDto.token_type = auth0ResponseLoginDto.token_type;
    loginResponseDto.id = user.id;
    loginResponseDto.names = user.names;
    loginResponseDto.surnames = user.surnames;
    loginResponseDto.email = user.email;
    loginResponseDto.authId = user.authId;
    loginResponseDto.picture = user.picture;
    loginResponseDto.rol = user.rol;
    loginResponseDto.company_id = user.company_id;
    return loginResponseDto;
  }
}
