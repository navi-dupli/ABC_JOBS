import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import {TeamService} from "../service/team.service";
import {CreateTeamDto} from "../dto/create-team.dto";
import {AddMemberTeamDto} from "../dto/add-member-team.dto"; // Importa el servicio correspondiente

@Controller('teams')
export class TeamController extends AuthorizedController {
  constructor(private readonly teamService: TeamService) {
    super();
  }

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    const team = await this.teamService.createTeam(createTeamDto);
    return team;
  }

  @Get()
  async getAll() {
    return await this.teamService.getTeams();
  }

  @Get('/:projectId')
  async getTeamByProject(@Param('projectId') projectId: number) {
    return await this.teamService.getTeamsByProject(projectId);
  }

  @Post('add-member-team')
  async addMemberTeam(@Body() addMemberTeamDto: AddMemberTeamDto) {
    return await this.teamService.addMemberTeam(addMemberTeamDto);
  }

  @Get('/candidates/:teamId')
  async getCandidatesByTeam(@Param('teamId') teamId: number) {
    return await this.teamService.getCandidateByTeam(teamId);
  }
}
