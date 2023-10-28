// cities.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/create-companie.dto';
import { BadRequestException } from '@nestjs/common';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should return a list of companies', async () => {
    const mockCompanies: Company[] = [
      {
        companyName: 'Test Company',
        uniqueIdentification: '123456',
        businessActivity: 'Software Development',
        companyEmail: 'test@test.com',
        representativeName: 'John Doe',
        representativeEmail: 'john.doe@test.com',
        phoneNumber: '123456789',
        country: 1,
        region: 2,
        city: 3,
        address: '123 Main St',
        id: 1,
      },
    ];
    jest.spyOn(service, 'getCompanies').mockResolvedValue(mockCompanies);

    const result = await controller.getCompanies();

    expect(result).toEqual(mockCompanies);
  });

  it('should create a company', async () => {
    const createCompanyDto: CreateCompanyDto = {
      companyName: 'Test Company',
      uniqueIdentification: '123456',
      businessActivity: 'Software Development',
      companyEmail: 'test@test.com',
      representativeName: 'John Doe',
      representativeEmail: 'john.doe@test.com',
      phoneNumber: '123456789',
      country: 1,
      region: 2,
      city: 3,
      address: '123 Main St',
    };
    const createdCompany: Company = {
      companyName: 'Test Company',
      uniqueIdentification: '123456',
      businessActivity: 'Software Development',
      companyEmail: 'test@test.com',
      representativeName: 'John Doe',
      representativeEmail: 'john.doe@test.com',
      phoneNumber: '123456789',
      country: 1,
      region: 2,
      city: 3,
      address: '123 Main St',
      id: 1,
    };
    jest.spyOn(service, 'createCompany').mockResolvedValue(createdCompany);

    const result = await controller.createCompany(createCompanyDto);

    expect(result).toEqual(createdCompany);
  });

  it('should handle BadRequestException from service', async () => {
    const createCompanyDto: CreateCompanyDto = {
      companyName: 'Test Company',
      uniqueIdentification: '123456',
      businessActivity: 'Software Development',
      companyEmail: 'test@test.com',
      representativeName: 'John Doe',
      representativeEmail: 'john.doe@test.com',
      phoneNumber: '123456789',
      country: 1,
      region: 2,
      city: 3,
      address: '123 Main St',
    };
    const error = new BadRequestException('Bad Request');
    jest.spyOn(service, 'createCompany').mockRejectedValue(error);

    await expect(controller.createCompany(createCompanyDto)).rejects.toThrow(BadRequestException);
  });

  it('should handle other exceptions from service', async () => {
    const createCompanyDto: CreateCompanyDto = {
      companyName: 'Test Company',
      uniqueIdentification: '123456',
      businessActivity: 'Software Development',
      companyEmail: 'test@test.com',
      representativeName: 'John Doe',
      representativeEmail: 'john.doe@test.com',
      phoneNumber: '123456789',
      country: 1,
      region: 2,
      city: 3,
      address: '123 Main St',
    };
    const error = new Error('Internal Server Error');
    jest.spyOn(service, 'createCompany').mockRejectedValue(error);

    await expect(controller.createCompany(createCompanyDto)).rejects.toThrow(Error);
  });
});
