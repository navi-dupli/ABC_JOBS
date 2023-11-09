import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Project} from "../../project/entities/project.entity";
import {Team} from "../entities/team.entity";
import {CreateProjectDto} from "../../project/dto/create-project.dto";
import {CreateTeamDto} from "../dto/create-team.dto";
import {AddMemberTeamDto} from "../dto/add-member-team.dto";
import {TeamMember} from "../entities/team-member.entity";


@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = new Team();
    team.name = createTeamDto.name;
    team.status = createTeamDto.state;
    team.projectId = createTeamDto.projectId;

    return this.teamRepository.save(team);
  }

  async getTeams() {
    return await this.teamRepository.find();
  }

  async getTeamsByProject(projectId: number) {
    return await this.teamRepository.find({
      where: { projectId, status: 'Activo' },
    });
  }

  async addMemberTeam(addMemberTeamDto: AddMemberTeamDto): Promise<TeamMember[]> {
    const createdItems: TeamMember[] = [];

    for (const user of addMemberTeamDto.users) {
      const teamMember = new TeamMember();
      teamMember.teamId = addMemberTeamDto.teamId;
      teamMember.userId = user.id;
      teamMember.userName = user.fullName;
      createdItems.push(await this.teamMemberRepository.save(teamMember))
    }

    return createdItems;
  }

  async getCandidateByTeam(teamId: number) {
    return await this.teamMemberRepository.find({
      where: { teamId },
    });
  }

}
