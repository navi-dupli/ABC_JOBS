import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Team} from "./entities/team.entity";
import {TeamMember} from "./entities/team-member.entity";
import {TeamController} from "./controllers/team.controller";
import {TeamService} from "./service/team.service";

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamMember])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
