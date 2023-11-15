import {Controller, Get, Inject, Param, Req} from '@nestjs/common';
import {MicroserviceEnum} from "../../../dynamic-routes.config";
import {MicroserviceClientService} from "../../../commons/modules/microservice-manager/services/microservice-client.service";
import { Request } from 'express';

@Controller('commons')
export class CommonsController {
  constructor(
    @Inject(MicroserviceEnum.COMMONS)
    private readonly microserviceClient: MicroserviceClientService,
  ) {}

  @Get('countries')
  async getCountries(@Req() req: Request) {
    return this.microserviceClient.call('/countries', 'GET', req).toPromise();
  }

  @Get('regions/country/:countryId')
  async getRegionsByCountry(@Req() req: Request, @Param('countryId') countryId: number) {
    return this.microserviceClient.call(`/regions/country/${countryId}`, 'GET', req).toPromise();
  }

  @Get('cities/region/:regionId')
  async getCitiesByRegion(@Req() req: Request, @Param('regionId') regionId: number) {
    return this.microserviceClient.call(`/cities/region/${regionId}`, 'GET', req).toPromise();
  }

  @Get('identification')
  async getIdentificationTypes(@Req() req: Request) {
    return this.microserviceClient.call('/identification', 'GET', req).toPromise();
  }

}
