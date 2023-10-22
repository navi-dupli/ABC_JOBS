import {BadRequestException, Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import { Auth0RoleEnum } from '../../../commons/modules/user-manager/enums/role.enum';

@Controller('users')
export class UsersController extends AuthorizedController {
  private readonly logger =new Logger(UsersController.name);
  constructor(private readonly userService: UsersService) {
    super();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.rol || Auth0RoleEnum.findByName(createUserDto.rol.toUpperCase()) === undefined) {
      this.logger.error(`Invalid rol ${createUserDto.rol} to create user`);
      throw new BadRequestException(`Invalid rol ${createUserDto.rol} to create user`);
    }
    if (createUserDto.rol.toUpperCase() === Auth0RoleEnum.REPRESENTANTE_EMPRESA.name && !createUserDto.company_id) {
      this.logger.error(`Invalid company_id to create user with rol ${createUserDto.rol}`);
      throw new BadRequestException('Invalid company_id');
    }
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/role/:role')
  async findAllByRole(@Param('role') role: string) {
    if (Auth0RoleEnum.findByName(role.toUpperCase()) === undefined) {
      this.logger.error(`Invalid rol ${role} to find users`);
      throw new BadRequestException(`Invalid rol ${role} to find users`);
    }
    return await this.userService.findAllBy({ rol: role.toUpperCase() });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOneBy({ id: id });
  }

  @Get('/auth0/:id')
  async findOneByAuth0Id(@Param('id') id: string) {
    return await this.userService.findOneBy({ auth0Id: id });
  }
}
