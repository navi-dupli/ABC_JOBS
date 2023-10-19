import { Test, TestingModule } from '@nestjs/testing';
import { TestsModule } from './tests.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../../database.config';

describe('TestsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), TestsModule],
      controllers: [],
      providers: [
        
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

});
