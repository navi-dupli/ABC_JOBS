import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Auth0ExternalApiService } from '../../../commons/modules/user-manager/services/auth0-external-api.service';
import { Auth0UserDto } from '../../../commons/modules/user-manager/dto/auth-user.dto';
import { ExternalApiResponseDto } from '../../../commons/modules/user-manager/dto/external-api.dto';
import { Auth0RoleEnum } from '../../../commons/modules/user-manager/enums/role.enum';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: Auth0ExternalApiService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const auth0User: Auth0UserDto = Auth0UserDto.fromCreateUserDto(createUserDto);
    const user = await this.userRepository.findOneBy({ email: createUserDto.email });
    // si ya existe el usuario, se actualiza el authId
    if (user) {
      if (user.authId) {
        throw new NotFoundException(`Usuario con email ${createUserDto.email} ya existe`);
      } else {
        await this.createAndUpdateUser(auth0User, user);
      }
      return user;
    } else {
      const newUser: User = new User();
      newUser.names = createUserDto.names;
      newUser.surnames = createUserDto.surnames;
      newUser.email = createUserDto.email;
      const userCreated: User = await this.userRepository.save(newUser);
      if (userCreated) {
        await this.createAndUpdateUser(auth0User, userCreated);
        return userCreated;
      } else {
        throw new NotFoundException(`Usuario con email ${createUserDto.email} no pudo ser creado`);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  private async createAndUpdateUser(auth0User: Auth0UserDto, user: User) {
    auth0User.picture = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user.id}&flip=true&radius=4`;
    auth0User.user_metadata = JSON.parse(JSON.stringify(user));
    this.logger.log(`Creando usuario en Auth0 con email ${auth0User.email}`);
    this.logger.log(JSON.stringify(auth0User));
    const externalApiUser: ExternalApiResponseDto = await this.authService.createUser(auth0User);
    user.authId = externalApiUser.user_id;
    user.picture = auth0User.picture;
    await this.userRepository.save(user);
    await this.authService.assignRole(externalApiUser.user_id, Auth0RoleEnum.CANDIDATO);
  }
}
