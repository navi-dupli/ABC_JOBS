import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { MicroserviceClientService } from '../../../commons/modules/microservice-manager/services/microservice-client.service';
import { Request } from 'express';
import { HttpException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { CompanyCreatedDto, CreateCompanyDto, CreateUserDto } from '../dto/create-companie.dto';
import { MicroserviceManagerModule } from '../../../commons/modules/microservice-manager/microservice-manager.module';
import { AxiosError } from 'axios';
import { MicroserviceEnum } from '../../../dynamic-routes.config';
import { HttpModule } from '@nestjs/axios';
import { MonitoringModule } from '../../../commons/modules/monitoring/monitoring.module';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let microserviceClientServiceUsers: MicroserviceClientService;
  let microserviceClientServiceCompanies: MicroserviceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MicroserviceManagerModule, HttpModule, MonitoringModule],
      providers: [
        CompaniesService,
        {
          provide: MicroserviceEnum.USERS,
          useClass: MicroserviceClientService,
        },
        {
          provide: MicroserviceEnum.COMPANIES,
          useClass: MicroserviceClientService,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService) as CompaniesService;
    microserviceClientServiceUsers = module.get<MicroserviceClientService>(MicroserviceEnum.USERS) as MicroserviceClientService;
    microserviceClientServiceCompanies = module.get<MicroserviceClientService>(MicroserviceEnum.COMPANIES) as MicroserviceClientService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCompany', () => {
    it('should create a company and user', async () => {
      const createCompanyDto: CreateCompanyDto = {
        companyName: 'Company Name',
        uniqueIdentification: '123456789',
        businessActivity: 'Business Activity',
        companyEmail: 'company@example.com',
        representativeName: 'Representative Name',
        representativeEmail: 'representative@example.com',
        representativePassword: 'password123',
        phoneNumber: '123456789',
        country: 1,
        region: 2,
        city: 3,
        address: '123 Main St',
      };

      const fakeCompanyResponse = {
        id: 1, // Fake company ID
        companyName: createCompanyDto.companyName,
        uniqueIdentification: createCompanyDto.uniqueIdentification,
      } as CompanyCreatedDto;

      const fakeUserResponse = {
        names: createCompanyDto.representativeName,
        surnames: createCompanyDto.representativeName,
        email: createCompanyDto.representativeEmail,
        password: createCompanyDto.representativePassword,
        rol: 'REPRESENTANTE_EMPRESA',
        company_id: fakeCompanyResponse.id,
        identification: createCompanyDto.uniqueIdentification,
      } as CreateUserDto;

      // Mock MicroserviceClientService to return fake responses
      jest.spyOn(microserviceClientServiceCompanies, 'call').mockReturnValue(of(fakeCompanyResponse));
      jest.spyOn(microserviceClientServiceUsers, 'call').mockReturnValue(of(fakeUserResponse));

      const request = {} as Request;

      const result = await service.createCompany(request, createCompanyDto);

      expect(result).toEqual({ ...fakeCompanyResponse, user: fakeUserResponse });
    });

    it('should handle errors when creating a company', async () => {
      const createCompanyDto: CreateCompanyDto = {
        companyName: 'Company Name',
        uniqueIdentification: '123456789',
        businessActivity: 'Business Activity',
        companyEmail: 'company@example.com',
        representativeName: 'Representative Name',
        representativeEmail: 'representative@example.com',
        representativePassword: 'password123',
        phoneNumber: '123456789',
        country: 1,
        region: 2,
        city: 3,
        address: '123 Main St',
      } as CreateCompanyDto;

      // Mock MicroserviceClientService to return an error
      jest.spyOn(microserviceClientServiceCompanies, 'call').mockReturnValue(
        throwError({
          response: {
            statusText: 'Company creation error',
            statusCode: 404,
          },
        } as unknown as AxiosError),
      );

      const request = {} as Request;

      // Handle the error and make assertions
      try {
        await service.createCompany(request, createCompanyDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Error creating company');
      }
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
