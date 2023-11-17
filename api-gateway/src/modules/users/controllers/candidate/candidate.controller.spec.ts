import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';
import {MicroserviceClientService} from "../../../../commons/modules/microservice-manager/services/microservice-client.service";
import {CandidateService} from "../../services/candidate/candidate.service";
import {MicroserviceEnum} from "../../../../dynamic-routes.config";
import {MicroserviceManagerModule} from "../../../../commons/modules/microservice-manager/microservice-manager.module";
import {MonitoringModule} from "../../../../commons/modules/monitoring/monitoring.module";
import {HttpModule} from "@nestjs/axios";

describe('CandidateController', () => {
  let controller: CandidateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MicroserviceManagerModule, MonitoringModule, HttpModule],
      controllers: [CandidateController],
      providers: [CandidateService,
        {
          provide: MicroserviceEnum.COMMONS,
          useClass: MicroserviceClientService,
        },
        {
          provide: MicroserviceEnum.USERS,
          useClass: MicroserviceClientService,
        },
      ],
    }).compile();

    controller = module.get<CandidateController>(CandidateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
