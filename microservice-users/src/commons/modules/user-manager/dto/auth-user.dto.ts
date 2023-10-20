import { CreateUserDto } from '../../../../modules/users/dto/create-user.dto';

export class Auth0UserDto {
  email: string;
  user_metadata: any;
  name: string;
  picture: string;
  password: string;
  app_metadata: any;

  static fromCreateUserDto(createUserDto: CreateUserDto): Auth0UserDto {
    const auth0UserDto = new Auth0UserDto();
    auth0UserDto.email = createUserDto.email;
    auth0UserDto.name = createUserDto.names + ' ' + createUserDto.surnames;
    auth0UserDto.password = createUserDto.password;
    auth0UserDto.app_metadata = { rol: createUserDto.rol };
    return auth0UserDto;
  }
}

export class RequestUserDto {
  email: string;
  user_metadata: UserMetadataDto;
  private blocked: boolean = false;
  private email_verified: boolean = false;
  name: string;
  picture: string;
  private connection: string = 'Username-Password-Authentication';
  password: string;
  private verify_email: boolean = false;
  private app_metadata: any;

  // Static method to convert from CreateUserDto to RequestUserDto
  static fromCreateUserDto(createUserDto: Auth0UserDto): RequestUserDto {
    const requestUserDto = new RequestUserDto();
    requestUserDto.email = createUserDto.email;
    requestUserDto.user_metadata = createUserDto.user_metadata;
    requestUserDto.name = createUserDto.name;
    requestUserDto.picture = createUserDto.picture;
    requestUserDto.password = createUserDto.password;
    requestUserDto.app_metadata = createUserDto.app_metadata;
    return requestUserDto;
  }
}

/**
 * aca agregamos los metadatos que queremos guardar en auth0,
 * Guardaremos todos los datos privados del user, para facilitar el manejo de la informacion en otros microservicios
 */
export class UserMetadataDto {
  rol: string;
  abc_id: number;
}
