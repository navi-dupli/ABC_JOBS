import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import {DimensionEntity} from "../entities/dimension.entity";

@Injectable()
export class DimensionService extends AuthorizedController {
  constructor(
    @InjectRepository(DimensionEntity)
    public dimensionRepository: Repository<DimensionEntity>,
  ) {
    super();
  }

  async getDimensions() {
    return await this.dimensionRepository.find();
  }

}
