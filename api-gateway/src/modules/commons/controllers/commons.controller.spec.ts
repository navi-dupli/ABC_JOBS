import { Test, TestingModule } from '@nestjs/testing';
import { CommonsController } from './commons.controller';
import {HttpModule} from "@nestjs/axios";
import {MonitoringModule} from "../../../commons/modules/monitoring/monitoring.module";
import {MicroserviceEnum} from "../../../dynamic-routes.config";
import {MicroserviceClientService} from "../../../commons/modules/microservice-manager/services/microservice-client.service";
import {of} from "rxjs";
import {Request} from "express";

describe('CommonsController', () => {
  let controller: CommonsController;
  let microserviceClientServiceCommons: MicroserviceClientService;

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
    microserviceClientServiceCommons = module.get<MicroserviceClientService>(MicroserviceEnum.COMMONS) as MicroserviceClientService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call countries', async () => {
    const fakeCountryDto = {
      id: 1,
      name: "Colombia"
    }

    jest.spyOn(microserviceClientServiceCommons, 'call').mockReturnValue(of(fakeCountryDto));
    const request = {} as Request;

    const result = await controller.getCountries(request);
    expect(result).toBeDefined();
  });

  it('should call regions', async () => {
    const fakeRegionDto = {
      id: 1,
      name: "Boyaca"
    }

    jest.spyOn(microserviceClientServiceCommons, 'call').mockReturnValue(of(fakeRegionDto));
    const request = {} as Request;

    const result = await controller.getRegionsByCountry(request, 1);
    expect(result).toBeDefined();
  });

  it('should call cities', async () => {
    const fakeCityDto = {
      id: 1,
      name: "Tunja"
    }

    jest.spyOn(microserviceClientServiceCommons, 'call').mockReturnValue(of(fakeCityDto));
    const request = {} as Request;

    const result = await controller.getCitiesByRegion(request, 1);
    expect(result).toBeDefined();
  });

});
