import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';
import { CandidateService } from '../../services/candidate/candidate.service';
import { UserAbilityLanguageDto } from '../../dto/user-ability-language.dto';
import { CreateCandidateDto } from '../../dto/create-candidate.dto';
import { dynamicRoutesConfig, MicroserviceEnum } from '../../../../dynamic-routes.config';
import { MicroserviceClientService } from '../../../../commons/modules/microservice-manager/services/microservice-client.service';
import { MicroserviceManagerModule } from '../../../../commons/modules/microservice-manager/microservice-manager.module';
import { MonitoringModule } from '../../../../commons/modules/monitoring/monitoring.module';
import { HttpModule } from '@nestjs/axios';
import { Request } from 'express';

describe('CandidateController', () => {
  let controller: CandidateController;
  let candidateService: CandidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MicroserviceManagerModule, MonitoringModule, HttpModule, MicroserviceManagerModule.forRoot(dynamicRoutesConfig)],
      controllers: [CandidateController],
      providers: [
        CandidateService,
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
    candidateService = module.get<CandidateService>(CandidateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCandidate', () => {
    it('should call createCandidate method of candidateService', async () => {
      const createCandidateDto: CreateCandidateDto = {
        names: 'John',
        surnames: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
        typeIdentificationId: 1,
        cityId: 1,
        regionId: 1,
        countryId: 1,
        identification: 'A12345',
        phone: '000000',
        dateBirthDate: new Date('2021-01-01'),
        address: '1',
      };
      const req: Request = {} as Request;

      const createCandidateSpy = jest.spyOn(candidateService, 'createCandidate');
      createCandidateSpy.mockResolvedValue(Promise.resolve({}));

      const a = await controller.createCandidate(createCandidateDto, req);
      expect(a).toBeDefined();
    });
  });

  describe('addLanguageAndSkill', () => {
    it('should call addLanguageAndSkill method of candidateService', async () => {
      const id = 1; // replace with your test data
      const userAbilityLanguageDto: UserAbilityLanguageDto = {
        abilities: [1],
        languages: ['ES'],
        experienceYears: 1,
      };
      const req: Request = {} as Request;

      const addLanguageAndSkillSpy = jest.spyOn(candidateService, 'addLanguageAndSkill');
      addLanguageAndSkillSpy.mockResolvedValue(Promise.resolve({}));

      const result = await controller.addLanguageAndSkill(id, userAbilityLanguageDto, req);
      expect(result).toBeDefined();
    });
  });
});
