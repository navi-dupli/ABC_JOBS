// cities.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/create-companie.dto';

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

  describe('getCompanies', () => {
    it('should return an array of companies', async () => {
      const createCompanyDto = getCompanieMock();
      const company = getCompanieFromDto(createCompanyDto);
      const result: Company[] = [company];
      jest.spyOn(service, 'getCompanies').mockResolvedValue(result);

      expect(await controller.getCompanies()).toBe(result);
    });
  });

  describe('createCompany', () => {
    it('should create a new company', async () => {
      const createCompanyDto = getCompanieMock();
      const result = getCompanieFromDto(createCompanyDto);
      jest.spyOn(service, 'createCompany').mockResolvedValue(result);

      expect(await controller.createCompany(createCompanyDto)).toBe(result);
    });
  });
});

function getCompanieMock() {
  const createCompanyDto: CreateCompanyDto = {
    companyName: 'Test Company',
    uniqueIdentification: '123456',
    businessActivity: 'Software Development',
    companyEmail: 'test@test.com',
    representativeName: 'John Doe',
    representativeEmail: 'john.doe@test.com',
    representativePassword: 'password123',
    phoneNumber: '123456789',
    country: 1,
    region: 2,
    city: 3,
    address: '123 Main St',
  };
  return createCompanyDto;
}

function getCompanieFromDto(createCompanyDto: CreateCompanyDto) {
  const result: Company = {
    address: createCompanyDto.address,
    businessActivity: createCompanyDto.businessActivity,
    city: createCompanyDto.city,
    companyEmail: createCompanyDto.companyEmail,
    companyName: createCompanyDto.companyName,
    country: createCompanyDto.country,
    id: 1,
    phoneNumber: createCompanyDto.phoneNumber,
    region: createCompanyDto.region,
    representativeEmail: createCompanyDto.representativeEmail,
    representativeName: createCompanyDto.representativeName,
    uniqueIdentification: createCompanyDto.uniqueIdentification,
    representativePassword: createCompanyDto.representativePassword,
  };
  return result;
}
