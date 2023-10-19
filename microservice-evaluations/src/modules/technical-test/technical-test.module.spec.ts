import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalTestModule } from './technical-test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../../database.config';

describe('TechnicalTestModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), TechnicalTestModule],
      controllers: [],
      providers: [
        
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

});
