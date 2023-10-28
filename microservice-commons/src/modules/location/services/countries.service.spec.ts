import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CountriesService', () => {
  let service: CountriesService;
  let repository: Repository<Country>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: getRepositoryToken(Country),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    repository = module.get<Repository<Country>>(getRepositoryToken(Country));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a city by ID', async () => {
      const countryId = 1;
      const expectedCountry: Country = {
        id: countryId,
        name: 'Country 1',
        code: 'C1',
        regions: [],
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedCountry);

      const result = await service.findOneById(countryId);

      expect(result).toBe(expectedCountry);
    });
    it('should throw NotFoundException if country is not found', async () => {
      const countryId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOneById(countryId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findByName', () => {
    it('should return countries by name', async () => {
      const countryName = 'ExampleCountry';
      const expectedCountries: Country[] = [
        {
          id: 1,
          name: countryName,
          code: 'C1',
          regions: [],
        },
      ];

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(expectedCountries),
      } as any);

      const result = await service.findByName(countryName);

      expect(result).toEqual(expectedCountries);
    });
  });
  describe('findAll', () => {
    it('should return all countries ', async () => {
      const countryName = 'ExampleCountry';
      const expectedCountry: Country = {
        id: 1,
        name: countryName,
        code: 'C1',
        regions: [],
      };

      jest.spyOn(repository, 'find').mockResolvedValue([expectedCountry]);

      const result = await service.findAll();

      expect(result).toEqual([expectedCountry]);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
