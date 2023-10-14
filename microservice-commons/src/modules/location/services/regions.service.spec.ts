import { Test, TestingModule } from '@nestjs/testing';
import { RegionsService } from './regions.service';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Region } from '../entities/region.entity';
import { NotFoundException } from '@nestjs/common';

describe('RegionsService', () => {
  let service: RegionsService;
  let repository: Repository<Region>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionsService,
        {
          provide: getRepositoryToken(Region),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RegionsService>(RegionsService);
    repository = module.get<Repository<Region>>(getRepositoryToken(Region));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a city by ID', async () => {
      const regionId = 1;
      const expectedRegion: Region = {
        id: regionId,
        name: 'Region 1',
        code: 'C1',
        country_id: 1,
        country: new Country(),
        cities: [],
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedRegion);

      const result = await service.findOneById(regionId);

      expect(result).toBe(expectedRegion);
    });

    it('should throw NotFoundException if region is not found', async () => {
      const regionId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.findOneById(regionId)).rejects.toThrowError(NotFoundException);
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
          country_id: countryId,
          country: null,
          cities: [],
        },
        {
          id: 2,
          name: 'Region 2',
          code: 'C2',
          country_id: countryId,
          country: null,
          cities: [],
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(expectedRegions);

      const result = await service.findByCountryId(countryId);

      expect(result).toBe(expectedRegions);
    });
  });

  describe('findByCountryIdAndRegionName', () => {
    it('should return a region by country ID and region name', async () => {
      const countryId = 1;
      const regionName = 'ExampleRegion';
      const expectedRegions: Region[] = [
        {
          id: 1,
          name: regionName,
          code: 'C1',
          country_id: countryId,
          country: null,
          cities: [],
        },
      ];

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(expectedRegions),
      } as any);

      const result = await service.findByCountryIdAndRegionName(countryId, regionName);

      expect(result).toBe(expectedRegions);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
