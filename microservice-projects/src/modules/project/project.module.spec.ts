import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from './project.module';
import { ProjectController } from './controllers/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../../database.config';

describe('ProjectModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), ProjectModule],
    }).compile();
  });

  it('should be defined', () => {
    const app = module.get<ProjectModule>(ProjectModule);
    expect(app).toBeDefined();
  });

  it('should have ProjectController', () => {
    const controller = module.get<ProjectController>(ProjectController);
    expect(controller).toBeDefined();
  });
});
