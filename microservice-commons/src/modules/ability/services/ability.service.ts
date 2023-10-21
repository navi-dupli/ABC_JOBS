import { Injectable } from '@nestjs/common';
import {Ability} from "../entities/ability.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AbilityService {
  constructor(
    @InjectRepository(Ability)
    private readonly abilityRepository: Repository<Ability>,
  ) {}

  async findAll(): Promise<Ability[]> {
    return await this.abilityRepository.find();
  }

}
