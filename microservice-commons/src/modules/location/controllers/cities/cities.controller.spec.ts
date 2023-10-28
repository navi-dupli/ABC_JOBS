// cities.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from '../../services/cities.service';
import { City } from '../../entities/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a city by ID', async () => {
      const cityId = 1;
      const expectedCity: City = {
        id: cityId,
        name: 'Buenos Aires',
        region_id: 1,
        country_id: 1,
        latitude: 1,
        longitude: 1,
        region: null,
      };

      jest.spyOn(service, 'findOneById').mockResolvedValue(expectedCity);

      const result = await controller.findOneById(cityId);

      expect(result).toBe(expectedCity);
    });
  });

  describe('findByRegionId', () => {
    it('should return cities by region ID', async () => {
      const regionId = 1;
      const expectedCities = [
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
      jest.spyOn(service, 'findByRegionId').mockResolvedValue(expectedCities);

      const result = await controller.findByRegionId(regionId);
      expect(result).toBe(expectedCities);
    });
  });

  describe('findByRegionIdAndCityName', () => {
    it('should return a city by region ID and city name', async () => {
      const regionId = 1;
      const cityName = 'City 1';
      const expectedCities = [
        {
          id: 1,
          name: cityName,
          region_id: 1,
          country_id: 1,
          latitude: 1,
          longitude: 1,
          region: null,
        },
      ]; // Adjust based on your actual City model
      jest.spyOn(service, 'findByRegionIdAndCityName').mockResolvedValue(expectedCities);

      const result = await controller.findByRegionIdAndCityName(regionId, cityName);
      expect(result).toBe(expectedCities);
    });
  });
});
