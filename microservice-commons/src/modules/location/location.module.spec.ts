import { Test, TestingModule } from '@nestjs/testing';
import { LocationModule } from './location.module';
import { CountriesController } from './controllers/countries/countries.controller';
import { CountriesService } from './services/countries.service';
import { RegionsController } from './controllers/regions/regions.controller';
import { RegionsService } from './services/regions.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { databaseConfig } from '../../database.config';

describe('LocationModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), LocationModule],
      controllers: [CountriesController, RegionsController],
      providers: [
        CountriesService,
        RegionsService,
        {
          provide: getRepositoryToken(Region),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Country),
          useClass: Repository,
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have CountriesController defined', () => {
    const controller = module.get<CountriesController>(CountriesController);
    expect(controller).toBeDefined();
  });

  it('should have CountriesService defined', () => {
    const service = module.get<CountriesService>(CountriesService);
    expect(service).toBeDefined();
  });

  it('should have RegionsController defined', () => {
    const controller = module.get<RegionsController>(RegionsController);
    expect(controller).toBeDefined();
  });

  it('should have RegionsService defined', () => {
    const service = module.get<RegionsService>(RegionsService);
    expect(service).toBeDefined();
  });
});
