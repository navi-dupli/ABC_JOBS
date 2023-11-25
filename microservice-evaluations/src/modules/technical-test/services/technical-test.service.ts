import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnicalTest } from '../entities/technical-test.entity';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import { RegisterTechnicalTestDto } from '../dto/register-technical-test.dto';

@Injectable()
export class TechnicalTestService extends AuthorizedController {
  constructor(
    @InjectRepository(TechnicalTest)
    public technicalTestRepository: Repository<TechnicalTest>,
  ) {
    super();
  }

  async registerTechTest(registerTechTest: RegisterTechnicalTestDto): Promise<TechnicalTest> {
    const techTest = this.technicalTestRepository.create(registerTechTest);
    return await this.technicalTestRepository.save(techTest);
  }

  async getTechTest() {
    return await this.technicalTestRepository.find();
  }
}
