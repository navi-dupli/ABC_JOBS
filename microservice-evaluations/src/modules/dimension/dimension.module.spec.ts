import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../../database.config';
import {DimensionModule} from "../performance-evaluation/performance-evaluation.module";

describe('DimensionModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), DimensionModule],
      controllers: [],
      providers: [

      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

});
