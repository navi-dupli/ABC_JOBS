import { Test, TestingModule } from '@nestjs/testing';
import { CommonsController } from './commons.controller';
import {HttpModule} from "@nestjs/axios";
import {MonitoringModule} from "../../../commons/modules/monitoring/monitoring.module";
import {MicroserviceEnum} from "../../../dynamic-routes.config";
import {MicroserviceClientService} from "../../../commons/modules/microservice-manager/services/microservice-client.service";

describe('CommonsController', () => {
  let controller: CommonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, MonitoringModule],
      controllers: [CommonsController],
      providers: [
        {
          provide: MicroserviceEnum.COMMONS,
          useClass: MicroserviceClientService,
        }
      ],
    }).compile();

    controller = module.get<CommonsController>(CommonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
