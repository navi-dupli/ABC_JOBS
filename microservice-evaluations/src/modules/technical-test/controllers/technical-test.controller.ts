import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { TechnicalTest } from '../entities/technical-test.entity';
import { TechnicalTestService } from '../services/technical-test.service';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import {RegisterTechnicalTestDto} from "../dto/register-technical-test.dto";

@Controller('technical-test')
export class TechnicalTestController extends AuthorizedController {
  constructor(private readonly technicalTestService: TechnicalTestService) {
    super();
  }

  @Get()
  async getTechnicalTest(): Promise<TechnicalTest[]> {
    try {
      return await this.technicalTestService.getTechTest();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post()
  async registerTechnicalTest(@Body() registerTechTestDto: RegisterTechnicalTestDto): Promise<TechnicalTest> {
    try {
      return await this.technicalTestService.registerTechTest(registerTechTestDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
