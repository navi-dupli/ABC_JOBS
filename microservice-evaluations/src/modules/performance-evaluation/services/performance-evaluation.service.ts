import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import { PerformanceEvaluationDto } from '../dto/performance-evaluation.dto';
import { PerformanceEvaluation } from '../entities/performance-evaluation.entity';
import * as crypto from 'crypto';

@Injectable()
export class PerformanceEvaluationService extends AuthorizedController {
  private readonly logger = new Logger(PerformanceEvaluationService.name);
  constructor(
    @InjectRepository(PerformanceEvaluation)
    public performanceEvaluationRepository: Repository<PerformanceEvaluation>,
  ) {
    super();
  }

  async registerPerformanceEvaluation(
    performanceEvaluationDto: PerformanceEvaluationDto,
  ): Promise<PerformanceEvaluation> {
    if (!this.validateHash(performanceEvaluationDto)) {
      this.logger.error('Invalid hash received');
      throw new HttpException('Invalid request received', HttpStatus.BAD_REQUEST);
    }

    const techTest = this.performanceEvaluationRepository.create(performanceEvaluationDto);
    return await this.performanceEvaluationRepository.save(techTest);
  }
  private validateHash(performanceEvaluationDto: PerformanceEvaluationDto): boolean {
    const hashReceived = performanceEvaluationDto.hash;
    const hashGenerated = crypto
      .createHash('sha256')
      .update(
        `${performanceEvaluationDto.performance}${performanceEvaluationDto.observations}${performanceEvaluationDto.project_id}${performanceEvaluationDto.team_id}${performanceEvaluationDto.user_id}${performanceEvaluationDto.qualifying_user_id}${performanceEvaluationDto.dimension_id}`,
      )
      .digest('hex');
    return hashReceived === hashGenerated;
  }

  async getPerformanceEvaluations() {
    return await this.performanceEvaluationRepository.find();
  }
}
