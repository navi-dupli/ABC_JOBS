import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import { PerformanceEvaluationDto } from '../dto/performance-evaluation.dto';
import { PerformanceEvaluation } from '../entities/performance-evaluation.entity';

@Injectable()
export class PerformanceEvaluationService extends AuthorizedController {
  constructor(
    @InjectRepository(PerformanceEvaluation)
    public performanceEvaluationRepository: Repository<PerformanceEvaluation>,
  ) {
    super();
  }

  async registerPerformanceEvaluation(
    performanceEvaluationDto: PerformanceEvaluationDto,
  ): Promise<PerformanceEvaluation> {
    const techTest = this.performanceEvaluationRepository.create(performanceEvaluationDto);
    return await this.performanceEvaluationRepository.save(techTest);
  }

  async getPerformanceEvaluations() {
    return await this.performanceEvaluationRepository.find();
  }
}
