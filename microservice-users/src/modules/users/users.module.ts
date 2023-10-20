import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserManagerModule } from '../../commons/modules/user-manager/user-manager.module';
import { LoginController } from './controllers/login/login.controller';
import { Auth0LoginService } from './services/auth0-login/auth0-login.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserManagerModule, HttpModule],
  controllers: [UsersController, LoginController],
  providers: [UsersService, Auth0LoginService],
})
export class UsersModule {}
