import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../entities/country.entity';
import { AuthorizedController } from '../../../../commons/controllers/authorized/authorized.controller';

@Controller('countries')
export class CountriesController extends AuthorizedController {
  constructor(private readonly countriesService: CountriesService) {
    super();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Country> {
    return this.countriesService.findOneById(id);
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string): Promise<Country> {
    return this.countriesService.findOneByName(name);
  }
}
