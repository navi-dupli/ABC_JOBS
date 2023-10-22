import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { LoginController } from './controllers/login/login.controller';
import { MicroserviceManagerModule } from '../../commons/modules/microservice-manager/microservice-manager.module';

@Module({
  imports: [MicroserviceManagerModule],
  controllers: [UsersController, LoginController],
})
export class UsersModule {}
