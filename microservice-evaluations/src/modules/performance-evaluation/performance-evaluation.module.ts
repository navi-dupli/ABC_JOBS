import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceEvaluationService } from './services/performance-evaluation.service';
import { PerformanceEvaluation } from './entities/performance-evaluation.entity';
import { PerformanceEvaluationController } from './controllers/performance-evaluation.controller';
import { AuditSubscriber } from '../../commons/audit/audit.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([PerformanceEvaluation])],
  controllers: [PerformanceEvaluationController],
  providers: [PerformanceEvaluationService, AuditSubscriber],
})
export class DimensionModule {}
