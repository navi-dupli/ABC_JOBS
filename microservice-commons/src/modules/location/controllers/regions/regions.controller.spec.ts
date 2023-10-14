import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';
import { RegionsService } from '../../services/regions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Region } from '../../entities/region.entity';
import { Repository } from 'typeorm';

describe('RegionsController', () => {
  let controller: RegionsController;
  let service: RegionsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionsController],
      providers: [
        RegionsService,
        {
          provide: getRepositoryToken(Region),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<RegionsController>(RegionsController);
    service = module.get<RegionsService>(RegionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a region by ID', async () => {
      const regionId = 1;
      const expectedRegion: Region = {
        id: regionId,
        name: 'Region 1',
        code: 'C1',
        country_id: 1,
        country: null,
        cities: [],
      };
      jest.spyOn(service, 'findOneById').mockResolvedValue(expectedRegion);
      const result = await controller.findOneById(regionId);
      expect(result).toBe(expectedRegion);
    });
  });

  describe('findByCountryId', () => {
    it('should return regions by country ID', async () => {
      const countryId = 1;
      const expectedRegions: Region[] = [
        {
          id: 1,
          name: 'Region 1',
          code: 'C1',
          country_id: 1,
          country: null,
          cities: [],
        },
        {
          id: 2,
          name: 'Region 2',
          code: 'C2',
          country_id: 1,
          country: null,
          cities: [],
        },
      ];

      jest.spyOn(service, 'findByCountryId').mockResolvedValue(expectedRegions);

      const result = await controller.findByCountryId(countryId);

      expect(result).toBe(expectedRegions);
    });
  });

  describe('findByCountryIdAndRegionName', () => {
    it('should return a region by country ID and region name', async () => {
      const countryId = 1;
      const regionName = 'ExampleRegion';
      const expectedRegion: Region[] = [
        {
          id: 1,
          name: 'Region 1',
          code: 'C1',
          country_id: countryId,
          country: null,
          cities: [],
        },
      ];

      jest.spyOn(service, 'findByCountryIdAndRegionName').mockResolvedValue(expectedRegion);

      const result = await controller.findByCountryIdAndRegionName(countryId, regionName);

      expect(result).toBe(expectedRegion);
    });
  });
});
