import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login/login.controller';

@Module({
  controllers: [LoginController],
})
export class UsersModule {}
