import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {TeamController} from "./team.controller";
import {TeamService} from "../service/team.service";
import {Team} from "../entities/team.entity";
import {CreateTeamDto} from "../dto/create-team.dto";
import {TeamMember} from "../entities/team-member.entity";
import {AddMemberTeamDto} from "../dto/add-member-team.dto";

describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TeamMember),
          useClass: Repository,
        }
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a team', async () => {
    const createTeamDto: CreateTeamDto = {
      status: "Activo",
      projectId: 1,
      name: "Nuevo equipo",
    };

    const createdTeam: Team = {
      id: 1,
      projectId: 1,
      name: "Nuevo proyecto",
      status: "Activo"
    };

    jest.spyOn(service, 'createTeam').mockResolvedValue(createdTeam);

    const result = await service.createTeam(createTeamDto);

    expect(result).toEqual(createdTeam);
  });

  it('should return a list of teams', async () => {
    const mockTeams: Team[] = [
      {
        projectId: 1,
        name: "Nuevo proyecto",
        status: "Active",
        id: 1
      }
    ];
    jest.spyOn(service, 'getTeams').mockResolvedValue(mockTeams);

    const result = await controller.getAll();

    expect(result).toEqual(mockTeams);
  });

  it('should return a list of teams', async () => {
    const mockTeams: Team[] = [
      {
        projectId: 1,
        name: "Nuevo proyecto",
        status: "Active",
        id: 1
      }
    ];
    jest.spyOn(service, 'getTeamsByProject').mockResolvedValue(mockTeams);

    const result = await controller.getTeamByProject(1);

    expect(result).toEqual(mockTeams);
  });

  it('should add member a team', async () => {
    const addMemberTeamDto: AddMemberTeamDto = {
      teamId: 1,
      users: [{
        id: 1,
        fullName: "Pedro Perez"
      }]
    };

    const createdTeamMember: TeamMember[] = [{
      teamId: 1,
      userId: 1,
      userName: "Pedro Perez",
      id: 1,
      status: "Activo"
    }];

    jest.spyOn(service, 'addMemberTeam').mockResolvedValue(createdTeamMember);

    const result = await service.addMemberTeam(addMemberTeamDto);

    expect(result).toEqual(createdTeamMember);
  });

});
