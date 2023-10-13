import { Controller, Get, Param, Query } from '@nestjs/common';
import { Region } from '../../entities/region.entity';
import { RegionsService } from '../../services/regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Region> {
    return this.regionsService.findOneById(id);
  }

  @Get('country/:countryId')
  async findByCountryId(@Param('countryId') countryId: number): Promise<Region[]> {
    return this.regionsService.findByCountryId(countryId);
  }

  @Get('country/:countryId/name')
  async findByCountryIdAndRegionName(
    @Param('countryId') countryId: number,
    @Query('name') name: string,
  ): Promise<Region> {
    return this.regionsService.findByCountryIdAndRegionName(countryId, name);
  }
}