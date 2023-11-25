import {Controller, Get, Param} from '@nestjs/common';
import { AbilityService } from '../services/ability.service';
import { Ability } from '../entities/ability.entity';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';

@Controller('skills')
export class AbilityController extends AuthorizedController {
  constructor(private readonly abilityService: AbilityService) {
    super();
  }

  @Get()
  findAll(): Promise<Ability[]> {
    return this.abilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ability> {
    return this.abilityService.findOne(id);
  }
}
