import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalTest } from './entities/technical-test.entity';
import { TechnicalTestController } from './controllers/technical-test.controller';
import { TechnicalTestService } from './services/technical-test.service';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalTest])],
  controllers: [TechnicalTestController],
  providers: [TechnicalTestService],
})
export class TechnicalTestModule {}
