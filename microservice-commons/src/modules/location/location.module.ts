import { Module } from '@nestjs/common';
import { CountriesController } from './controllers/countries/countries.controller';
import { CountriesService } from './services/countries.service';
import { RegionsController } from './controllers/regions/regions.controller';
import { RegionsService } from './services/regions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Region } from './entities/region.entity';
import { City } from './entities/city.entity';
import { CitiesController } from './controllers/cities/cities.controller';
import { CitiesService } from './services/cities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Region, City])],
  controllers: [CountriesController, RegionsController, CitiesController],
  providers: [CountriesService, RegionsService, CitiesService],
})
export class LocationModule {}
