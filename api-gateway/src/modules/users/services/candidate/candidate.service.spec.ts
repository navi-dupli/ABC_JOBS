import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';
import {MicroserviceEnum} from "../../../../dynamic-routes.config";
import {MicroserviceClientService} from "../../../../commons/modules/microservice-manager/services/microservice-client.service";
import {MicroserviceManagerModule} from "../../../../commons/modules/microservice-manager/microservice-manager.module";
import {MonitoringModule} from "../../../../commons/modules/monitoring/monitoring.module";
import {HttpModule} from "@nestjs/axios";

describe('CandidateService', () => {
  let service: CandidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MicroserviceManagerModule, MonitoringModule, HttpModule],
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

    service = module.get<CandidateService>(CandidateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
