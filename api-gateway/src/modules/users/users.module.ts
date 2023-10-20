import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { GenericDelegateModule } from '../../commons/modules/generic-delegate/generic-delegate.module';
import { LoginController } from './controllers/login/login.controller';

@Module({
  imports: [GenericDelegateModule],
  controllers: [UsersController, LoginController],
})
export class UsersModule {}
