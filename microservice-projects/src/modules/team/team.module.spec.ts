import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../../database.config';
import {TeamModule} from "./team.module";
import {TeamController} from "./controllers/team.controller";

describe('TeamModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), TeamModule],
    }).compile();
  });

  it('should be defined', () => {
    const app = module.get<TeamModule>(TeamModule);
    expect(app).toBeDefined();
  });

  it('should have TeamController', () => {
    const controller = module.get<TeamController>(TeamController);
    expect(controller).toBeDefined();
  });
});
