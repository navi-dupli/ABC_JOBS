import {Controller, Get} from '@nestjs/common';
import {AbilityService} from "../services/ability.service";
import {Ability} from "../entities/ability.entity";

@Controller('skills')
export class AbilityController {
  constructor(private readonly abilityService: AbilityService) {}

  @Get()
  findAll(): Promise<Ability[]> {
    return this.abilityService.findAll();
  }
}
