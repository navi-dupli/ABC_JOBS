import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Auth0ExternalApiService } from '../../../commons/modules/user-manager/services/auth0-external-api.service';
import { Auth0UserDto } from '../../../commons/modules/user-manager/dto/auth-user.dto';
import { ExternalApiResponseDto } from '../../../commons/modules/user-manager/dto/external-api.dto';
import { Auth0RoleEnum, AuthRole } from '../../../commons/modules/user-manager/enums/role.enum';
import { UserAlreadyExistException } from '../../../commons/exceptions/user-already-exist.exception';
import { UserCreationErrorException } from '../../../commons/exceptions/user-creation-error.exception';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { Auth0LoginService } from './auth0-login/auth0-login.service';
import * as jwt from 'jsonwebtoken';
import { UserLoginErrorException } from '../../../commons/exceptions/user-login-error.exception';
import { UserLoginFailedException } from '../../../commons/exceptions/user-login-failed.exception';
import { UserLocation } from '../../userLocation/entities/userLocation.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserLocation)
    private readonly userLocationRepository: Repository<UserLocation>,
    private readonly authService: Auth0ExternalApiService,
    private readonly aut0LoginService: Auth0LoginService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const auth0User: Auth0UserDto = Auth0UserDto.fromCreateUserDto(createUserDto);
    const user = await this.userRepository.findOneBy({ email: createUserDto.email });
    // si ya existe el usuario, se actualiza el authId
    if (user) {
      if (user.authId) {
        throw new UserAlreadyExistException(`Usuario con email ${createUserDto.email} ya existe`);
      } else {
        await this.createAndUpdateUser(auth0User, user, Auth0RoleEnum.findByName(user.rol));
      }
      return user;
    } else {
      const newUser: User = new User();
      newUser.names = createUserDto.names;
      newUser.surnames = createUserDto.surnames;
      newUser.email = createUserDto.email;
      newUser.rol = createUserDto.rol.toUpperCase();
      if (createUserDto.rol.toUpperCase() === Auth0RoleEnum.REPRESENTANTE_EMPRESA.name) {
        newUser.company_id = createUserDto.company_id;
      }
      newUser.typeIdentificationId = createUserDto.typeIdentificationId;
      newUser.nameIdentification = createUserDto.nameIdentification;
      newUser.phone = createUserDto.phone;
      newUser.address = createUserDto.address;
      newUser.dateBirthDate = createUserDto.dateBirthDate;
      if (createUserDto.locationId) {
        let location = await this.userLocationRepository.findOneBy({
          idCity: createUserDto.locationId.idCity,
          idRegion: createUserDto.locationId.idRegion,
          idCountry: createUserDto.locationId.idCountry,
        });
        if (location) {
          location = {
            ...location,
            nameCity: createUserDto.locationId.nameCity,
            nameRegion: createUserDto.locationId.nameRegion,
            nameCountry: createUserDto.locationId.nameCountry,
          };
          newUser.location = location;
        } else {
          const newLocation = new UserLocation();
          newLocation.idCity = createUserDto.locationId.idCity;
          newLocation.idRegion = createUserDto.locationId.idRegion;
          newLocation.idCountry = createUserDto.locationId.idCountry;
          newLocation.nameCity = createUserDto.locationId.nameCity;
          newLocation.nameRegion = createUserDto.locationId.nameRegion;
          newLocation.nameCountry = createUserDto.locationId.nameCountry;
        }
      }
      newUser.identification = createUserDto.identification;
      try {
        const userCreated: User = await this.userRepository.save(newUser);
        await this.createAndUpdateUser(auth0User, userCreated, Auth0RoleEnum.findByName(userCreated.rol));
        return userCreated;
      } catch (error) {
        throw new UserCreationErrorException(`Usuario con email ${createUserDto.email} no pudo ser creado`);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllBy(query: any): Promise<User[]> {
    return this.userRepository.findBy(query);
  }

  findOneBy(query: any): Promise<User> {
    return this.userRepository.findOneBy(query);
  }

  private async createAndUpdateUser(auth0User: Auth0UserDto, user: User, rol: AuthRole) {
    auth0User.picture = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user.id}&flip=true&radius=4`;
    auth0User.user_metadata = JSON.parse(JSON.stringify(user));
    this.logger.log(`Creando usuario en Auth0 con email ${auth0User.email}`);
    this.logger.log(JSON.stringify(auth0User));
    const externalApiUser: ExternalApiResponseDto = await this.authService.createUser(auth0User);
    user.authId = externalApiUser.user_id;
    user.picture = auth0User.picture;
    await this.userRepository.save(user);
    await this.authService.assignRole(externalApiUser.user_id, rol);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const userLogged = await this.aut0LoginService.authenticate(loginDto);
    if (userLogged) {
      const decodedToken = jwt.decode(userLogged.access_token) as jwt.JwtPayload;

      if (!decodedToken || !decodedToken.exp) {
        throw new UserLoginErrorException('Error al decodificar el token');
      }
      const user = await this.userRepository.findOneBy({ authId: decodedToken.sub });
      if (user) {
        return LoginResponseDto.fromAuth0ResponseLoginDto(userLogged, user);
      }
    } else {
      throw new UserLoginFailedException('Error al loguear el usuario');
    }

    throw new UserLoginErrorException('Error al loguear el usuario, no exite en la bd local');
  }
}
