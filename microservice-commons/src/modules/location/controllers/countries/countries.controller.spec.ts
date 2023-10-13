import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from '../../services/countries.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../entities/country.entity';

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        CountriesService,
        {
          provide: getRepositoryToken(Country),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a country by ID', async () => {
      const countryId = 1;
      const expectedCountry: Country = {
        id: countryId,
        name: 'Country 1',
        code: 'C1',
        regions: [],
      };

      jest.spyOn(service, 'findOneById').mockResolvedValue(expectedCountry);

      const result = await controller.findOneById(countryId);

      expect(result).toBe(expectedCountry);
    });
  });

  describe('findOneByName', () => {
    it('should return a country by name', async () => {
      const countryName = 'ExampleCountry';
      const expectedCountry: Country = {
        id: 1,
        name: countryName,
        code: 'C1',
        regions: [],
      };

      jest.spyOn(service, 'findOneByName').mockResolvedValue(expectedCountry);

      const result = await controller.findOneByName(countryName);

      expect(result).toBe(expectedCountry);
    });
  });
});
