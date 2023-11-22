import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import { PerformanceEvaluationService } from '../services/performance-evaluation.service';
import { PerformanceEvaluation } from '../entities/performance-evaluation.entity';
import { PerformanceEvaluationDto } from '../dto/performance-evaluation.dto';

@Controller('performance-evaluation')
export class PerformanceEvaluationController extends AuthorizedController {
  constructor(private readonly performanceEvaluationService: PerformanceEvaluationService) {
    super();
  }

  @Get()
  async getPerformanceEval(): Promise<PerformanceEvaluation[]> {
    try {
      return await this.performanceEvaluationService.getPerformanceEvaluations();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post()
  async registerPerformanceEval(
    @Body() performanceEvaluationDto: PerformanceEvaluationDto,
  ): Promise<PerformanceEvaluation> {
    return await this.performanceEvaluationService.registerPerformanceEvaluation(performanceEvaluationDto);
  }
}
