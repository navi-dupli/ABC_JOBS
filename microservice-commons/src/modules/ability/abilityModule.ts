import { Module } from '@nestjs/common';
import {Ability} from "./entities/ability.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AbilityController} from "./controllers/ability.controller";
import {AbilityService} from "./services/ability.service";

@Module({
  imports: [TypeOrmModule.forFeature([Ability])],
  controllers: [AbilityController],
  providers: [AbilityService],
})
export class AbilityModule {}
