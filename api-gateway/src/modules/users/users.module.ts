import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { GenericDelegateModule } from '../../commons/modules/generic-delegate/generic-delegate.module';

@Module({
  imports: [GenericDelegateModule],
  controllers: [UsersController],
})
export class UsersModule {}
