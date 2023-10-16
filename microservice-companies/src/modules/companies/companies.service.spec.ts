import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/create-companie.dto';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let repository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    repository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  describe('createCompany', () => {
    it('should create a new company', async () => {
      const createCompanyDto: CreateCompanyDto = getCompanieMock();
      // Configurar el comportamiento del repositorio
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockReturnValue(createCompanyDto as any);
      jest.spyOn(repository, 'save').mockResolvedValue(createCompanyDto as any);

      // Llamar al método del servicio
      const result = await service.createCompany(createCompanyDto);

      // Verificar que los métodos del repositorio se hayan llamado correctamente
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { representativeEmail: createCompanyDto.representativeEmail },
      });
      expect(repository.create).toHaveBeenCalledWith(createCompanyDto);
      expect(repository.save).toHaveBeenCalledWith(createCompanyDto);

      // Verificar que el resultado sea el esperado
      expect(result).toEqual(createCompanyDto);
    });

    it('should throw an error if the representative email already exists', async () => {
      const createCompanyDto: CreateCompanyDto = getCompanieMock();
      const existingRepresentative: Company = getCompanieFromDto(createCompanyDto);

      // Configurar el comportamiento del repositorio para simular que ya existe un representante
      jest.spyOn(repository, 'findOne').mockResolvedValue(existingRepresentative);

      // Llamar al método del servicio y esperar que arroje un error
      await expect(service.createCompany(createCompanyDto)).rejects.toThrowError(
        'El correo del representante ya esta asociado a otra empresa',
      );

      // Verificar que el método findOne del repositorio se haya llamado correctamente
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { representativeEmail: createCompanyDto.representativeEmail },
      });
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
