import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import {DimensionService} from "../services/dimension.service";
import {DimensionEntity} from "../entities/dimension.entity";

@Controller('dimension')
export class DimensionController extends AuthorizedController {
  constructor(private readonly dimensionService: DimensionService) {
    super();
  }

  @Get()
  async getDimensions(): Promise<DimensionEntity[]> {
    try {
      return await this.dimensionService.getDimensions();
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
