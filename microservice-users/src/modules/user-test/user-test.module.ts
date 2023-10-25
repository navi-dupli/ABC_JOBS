import { Module } from '@nestjs/common';
import { UserTestService } from './services/user-test.service';
import { UserTestController } from './controllers/user-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTest } from './entities/user-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTest])],
  providers: [UserTestService],
  controllers: [UserTestController],
})
export class UserTestModule {}
