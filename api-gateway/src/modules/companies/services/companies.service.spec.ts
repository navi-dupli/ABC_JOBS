import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { MicroserviceClientService } from '../../../commons/modules/microservice-manager/services/microservice-client.service';
import { Request } from 'express';
import { HttpException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { CompanyCreatedDto, CreateCompanyDto, CreateUserDto } from '../dto/create-companie.dto';
import { MicroserviceManagerModule } from '../../../commons/modules/microservice-manager/microservice-manager.module';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let microserviceClientService: MicroserviceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MicroserviceManagerModule],
      providers: [CompaniesService],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    microserviceClientService = module.get<MicroserviceClientService>(MicroserviceClientService);
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
      jest.spyOn(microserviceClientService, 'call').mockReturnValueOnce(of(fakeCompanyResponse));
      jest.spyOn(microserviceClientService, 'call').mockReturnValueOnce(of(fakeUserResponse));

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
      jest
        .spyOn(microserviceClientService, 'call')
        .mockReturnValueOnce(throwError(new Error('Company creation error')));

      const request = {} as Request;

      // Handle the error and make assertions
      try {
        await service.createCompany(request, createCompanyDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Error creating company');
      }
    });

    it('should handle errors when creating a user', async () => {
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
        // Fake company response
      };

      // Mock MicroserviceClientService to return a fake company response but an error when creating the user
      jest.spyOn(microserviceClientService, 'call').mockReturnValueOnce(of(fakeCompanyResponse));
      jest
        .spyOn(microserviceClientService, 'call')
        .mockReturnValueOnce(throwError(new HttpException('User creation error', 404)));

      const request = {
        headers: {
          'x-request-id': '123456789',
        },
      } as unknown as Request;

      // Handle the error and make assertions
      try {
        await service.createCompany(request, createCompanyDto);
      } catch (error) {
        expect(error.message).toBe('Error creating user');
      }
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
