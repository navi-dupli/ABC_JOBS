import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { Team } from '../entities/team.entity';
import { TeamMember } from '../entities/team-member.entity';
import { CreateTeamDto } from '../dto/create-team.dto';

describe('TeamService', () => {
  let teamService: TeamService;
  let teamRepository: Repository<Team>;
  let teamMemberRepository: Repository<TeamMember>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TeamMember),
          useClass: Repository,
        },
      ],
    }).compile();

    teamService = module.get<TeamService>(TeamService);
    teamRepository = module.get<Repository<Team>>(getRepositoryToken(Team));
    teamMemberRepository = module.get<Repository<TeamMember>>(getRepositoryToken(TeamMember));
  });

  it('should be defined', () => {
    expect(teamService).toBeDefined();
  });

  it('should create a team', async () => {
    const createTeamDto: CreateTeamDto = {
      name: 'Nuevo proyecto',
      status: 'Activo',
      projectId: 1,
    };

    const savedTeam = new Team();
    savedTeam.id = 1;
    savedTeam.name = createTeamDto.name;
    savedTeam.status = createTeamDto.status;
    savedTeam.projectId = createTeamDto.projectId;

    jest.spyOn(teamRepository, 'save').mockResolvedValue(savedTeam);

    const result = await teamService.createTeam(createTeamDto);

    expect(result).toEqual(savedTeam);
  });

  it('should create a team', async () => {
    const createTeamDto: Team[] = [
      {
        projectId: 1,
        name: 'Nuevo proyecto',
        status: 'Activo',
        id: 1,
      },
    ];

    jest.spyOn(teamRepository, 'find').mockResolvedValue(createTeamDto);

    const result = await teamService.getTeams();

    expect(result).toEqual(createTeamDto);
  });

  it('should create a team', async () => {
    const createTeamDto: Team[] = [
      {
        projectId: 1,
        name: 'Nuevo proyecto',
        status: 'Activo',
        id: 1,
      },
    ];

    jest.spyOn(teamRepository, 'find').mockResolvedValue(createTeamDto);

    const result = await teamService.getTeams();

    expect(result).toEqual(createTeamDto);
  });

  it('should get teams by project', async () => {
    const projectId = 1;
    const teams = [
      {
        projectId: 1,
        name: 'Nuevo proyecto',
        status: 'Activo',
        id: 1,
      },
    ];
    jest.spyOn(teamRepository, 'find').mockResolvedValue(teams);

    const result = await teamService.getTeamsByProject(projectId);

    expect(result).toEqual(teams);
    expect(teamRepository.find).toHaveBeenCalledWith({ where: { projectId, status: 'Activo' } });
  });

  it('should get candidates by team', async () => {
    const teamId = 1;
    const candidates = [
      {
        id: 1,
        userId: 1,
        userName: 'Pedro Perez',
        status: 'Activo',
        teamId: 1,
      },
    ];
    jest.spyOn(teamMemberRepository, 'find').mockResolvedValue(candidates);

    const result = await teamService.getCandidateByTeam(teamId);

    expect(result).toEqual(candidates);
    expect(teamMemberRepository.find).toHaveBeenCalledWith({ where: { teamId } });
  });
});
