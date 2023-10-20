import { User } from '../entities/user.entity';

export class LoginDto {
  public email: string;
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
  public access_token: string;
  public expires_in: number;
  public token_type: string;
}

export class LoginResponseDto extends Auth0ResponseLoginDto {
  id: number;
  names: string;
  surnames: string;
  email: string;
  authId: string;
  picture: string;
  rol: string;

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
    return loginResponseDto;
  }
}
