import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../../database.config';
import {PerformanceEvaluationModule} from "../dimension/dimension.module";

describe('PerformanceEvaluationModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), PerformanceEvaluationModule],
      controllers: [],
      providers: [

      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

});
