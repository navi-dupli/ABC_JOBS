import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import {MicroserviceEnum} from "../../../../dynamic-routes.config";
import {MicroserviceClientService} from "../../../../commons/modules/microservice-manager/services/microservice-client.service";
import {MicroserviceManagerModule} from "../../../../commons/modules/microservice-manager/microservice-manager.module";
import {MonitoringModule} from "../../../../commons/modules/monitoring/monitoring.module";
import {HttpModule} from "@nestjs/axios";
import {CompanyCreatedDto, CreateCompanyDto, CreateUserDto} from "../../../companies/dto/create-companie.dto";
import {of} from "rxjs";
import {Request} from "express";
import {CreateCandidateDto} from "../../dto/create-candidate.dto";

describe('CandidateService', () => {
  let service: CandidateService;
  let microserviceClientServiceCommons: MicroserviceClientService;
  let microserviceClientServiceUsers: MicroserviceClientService;

  // Mock de la librería 'microservice-manager'
  const mockMicroserviceClientService = {
    call: jest.fn(),
  };

  // Configuración del módulo de pruebas
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
    microserviceClientServiceUsers = module.get<MicroserviceClientService>(MicroserviceEnum.USERS) as MicroserviceClientService;
    microserviceClientServiceCommons = module.get<MicroserviceClientService>(MicroserviceEnum.COMMONS) as MicroserviceClientService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a candidate', async () => {
    const createCandidateDto: CreateCandidateDto = {
      address: 'cll 1 2 3',
      cityId: 1,
      countryId: 1,
      dateBirthDate: new Date(),
      email: 'a@a.com',
      identification: '12345679',
      names: 'prueba',
      password: 'pruena123',
      phone: '00000',
      regionId: 1,
      surnames: 'apellido',
      typeIdentificationId: 1
    };

    const fakeCountryDto = {
      id: 1,
      name: 'Colombia'
    }

    const fakeRegionDto = {
      id: 1,
      name: 'Boyaca'
    }

    const fakeCityDto = {
      id: 1,
      name: 'Tunja'
    }

    const fakeIdentificationDto = {
      "id": 1,
      "code": "CC",
      "name": "Cédula de Ciudadanía",
      "status": true
    }

    const fakeUser = {
      address: 'cll 1 2 3',
        cityId: 1,
        countryId: 1,
        dateBirthDate: new Date(),
        email: 'a@a.com',
        identification: '12345679',
        names: 'prueba',
        password: 'pruena123',
        phone: '00000',
        regionId: 1,
        surnames: 'apellido',
        typeIdentificationId: 1,
        locationId: {
        idCity: 1,
          idRegion: 1,
          idCountry: 1,
          nameCity: 'Tunja',
          nameRegion: 'Boyaca',
          nameCountry: 'Colombia'
      }
    };

    // Mock MicroserviceClientService to return fake responses
    jest.spyOn(microserviceClientServiceCommons, 'call').mockReturnValue(of(fakeCountryDto));
    jest.spyOn(microserviceClientServiceCommons, 'call').mockReturnValue(of(fakeRegionDto));
    jest.spyOn(microserviceClientServiceCommons, 'call').mockReturnValue(of(fakeCityDto));
    jest.spyOn(microserviceClientServiceCommons, 'call').mockReturnValue(of(fakeIdentificationDto));
    jest.spyOn(microserviceClientServiceUsers, 'call').mockReturnValue(of(fakeUser));
    const request = {} as Request;

    const result = await service.createCandidate(request, createCandidateDto);
    expect(result).toBeDefined();
  });

  it()

});