import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DimensionEntity} from "./entities/dimension.entity";
import {DimensionController} from "./controllers/dimension.controller";
import {DimensionService} from "./services/dimension.service";

@Module({
  imports: [TypeOrmModule.forFeature([DimensionEntity])],
  controllers: [DimensionController],
  providers: [DimensionService],
})
export class PerformanceEvaluationModule {}
