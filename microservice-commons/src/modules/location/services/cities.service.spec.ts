import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CitiesService', () => {
  let service: CitiesService;
  let repository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    repository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a city by ID', async () => {
      const cityId = 1;
      const expectedCity: City = {
        id: cityId,
        name: 'City 1',
        region_id: 1,
        country_id: 1,
        latitude: 1,
        longitude: 1,
        region: null,
      }; // Adjust this based on your actual City model
      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedCity);

      const result = await service.findOneById(cityId);
      expect(result).toBe(expectedCity);
    });

    it('should throw NotFoundException if city is not found', async () => {
      const cityId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.findOneById(cityId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findByRegionId', () => {
    it('should return cities by region ID', async () => {
      const regionId = 1;
      const expectedCities: City[] = [
        {
          id: 1,
          name: 'City 1',
          region_id: 1,
          country_id: 1,
          latitude: 1,
          longitude: 1,
          region: null,
        },
        {
          id: 2,
          name: 'City 2',
          region_id: 1,
          country_id: 1,
          latitude: 1,
          longitude: 1,
          region: null,
        },
      ]; // Adjust based on your actual City model
      jest.spyOn(repository, 'find').mockResolvedValue(expectedCities);

      const result = await service.findByRegionId(regionId);
      expect(result).toBe(expectedCities);
    });
  });

  describe('findByRegionIdAndCityName', () => {
    it('should return a city by region ID and city name', async () => {
      const regionId = 1;
      const cityName = 'City 1';
      const expectedCity: City = {
        id: 1,
        name: cityName,
        region_id: 1,
        country_id: 1,
        latitude: 1,
        longitude: 1,
        region: null,
      }; // Adjust based on your actual City model
      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedCity);

      const result = await service.findByRegionIdAndCityName(regionId, cityName);
      expect(result).toBe(expectedCity);
    });

    it('should throw NotFoundException if city is not found', async () => {
      const regionId = 1;
      const cityName = 'NonexistentCity';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findByRegionIdAndCityName(regionId, cityName)).rejects.toThrowError(NotFoundException);
    });
  });
});
