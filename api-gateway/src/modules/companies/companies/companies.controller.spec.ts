import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from '../services/companies.service';
import { Request } from 'express';
import { CreateCompanyDto } from '../dto/create-companie.dto';
import { MicroserviceManagerModule } from '../../../commons/modules/microservice-manager/microservice-manager.module';
import { MicroserviceEnum } from '../../../dynamic-routes.config';
import { MicroserviceClientService } from '../../../commons/modules/microservice-manager/services/microservice-client.service';
import { MonitoringModule } from '../../../commons/modules/monitoring/monitoring.module';
import { HttpModule } from '@nestjs/axios';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let companiesService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MicroserviceManagerModule, MonitoringModule, HttpModule],
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: MicroserviceEnum.COMPANIES,
          useClass: MicroserviceClientService,
        },
        {
          provide: MicroserviceEnum.USERS,
          useClass: MicroserviceClientService,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    companiesService = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCompany', () => {
    it('should create a company', async () => {
      const createCompanyDto: CreateCompanyDto = {
        companyName: 'Example Company',
        uniqueIdentification: '123456789',
        businessActivity: 'Technology',
        companyEmail: 'example@example.com',
        representativeName: 'John Doe',
        representativeEmail: 'john@example.com',
        representativePassword: 'password123',
        phoneNumber: '123456789',
        country: 1, // Replace with actual country ID
        region: 2, // Replace with actual region ID
        city: 3, // Replace with actual city ID
        address: '123 Main St',
      };

      const request = {
        body: createCompanyDto,
        user: { id: 1, email: 'user@example.com' },
      } as unknown as Request;

      const expectedResponse = {
        /* Define your expected response here */
      };

      jest.spyOn(companiesService, 'createCompany').mockResolvedValue(expectedResponse);

      const response = await controller.createCompany(request.body, request);

      expect(response).toEqual(expectedResponse);
    });

    it('should handle errors when creating a company', async () => {
      const createCompanyDto: CreateCompanyDto = {
        companyName: 'Example Company',
        uniqueIdentification: '123456789',
        businessActivity: 'Technology',
        companyEmail: 'example@example.com',
        representativeName: 'John Doe',
        representativeEmail: 'john@example.com',
        representativePassword: 'password123',
        phoneNumber: '123456789',
        country: 1, // Replace with actual country ID
        region: 2, // Replace with actual region ID
        city: 3, // Replace with actual city ID
        address: '123 Main St',
      };

      const request = {
        body: createCompanyDto,
        user: { id: 1, email: 'user@example.com' },
      } as unknown as Request;

      const expectedError = new Error('Error message'); // Define your expected error here

      jest.spyOn(companiesService, 'createCompany').mockRejectedValue(expectedError);

      // Handle the error as needed and make assertions
      try {
        await controller.createCompany(request.body, request);
      } catch (error) {
        expect(error).toBe(expectedError);
        // Additional assertions for error handling
      }
    });
  });
});
