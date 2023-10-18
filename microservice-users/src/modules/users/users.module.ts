import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserManagerModule } from '../../commons/modules/user-manager/user-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserManagerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
