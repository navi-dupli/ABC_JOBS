import { Controller, Get, Param, Query } from '@nestjs/common';
import { City } from '../../entities/city.entity';
import { CitiesService } from '../../services/cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<City> {
    return this.citiesService.findOneById(id);
  }

  @Get('region/:regionId')
  async findByRegionId(@Param('regionId') regionId: number): Promise<City[]> {
    return this.citiesService.findByRegionId(regionId);
  }

  @Get('region/:regionId/name')
  async findByRegionIdAndCityName(@Param('regionId') regionId: number, @Query('name') name: string): Promise<City> {
    return this.citiesService.findByRegionIdAndCityName(regionId, name);
  }
}
