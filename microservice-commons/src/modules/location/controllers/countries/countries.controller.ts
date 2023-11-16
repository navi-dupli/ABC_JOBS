import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../entities/country.entity';
import { AuthorizedController } from '../../../../commons/controllers/authorized/authorized.controller';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('')
  async findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<Country> {
    return this.countriesService.findOneById(id);
  }

  @Get('/search/:name')
  async findOneByName(@Param('name') name: string): Promise<Country[]> {
    return this.countriesService.findByName(name);
  }
}
