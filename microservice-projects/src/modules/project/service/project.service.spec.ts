import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';

describe('ProjectService', () => {
  let projectService: ProjectService;
  let projectRepository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
    projectRepository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  it('should create a project', async () => {
    const createProjectDto: CreateProjectDto = {
      projectName: 'Test Project',
      projectDescription: 'Test Description',
      companyId: 1,
      projectDate: new Date(),
    };

    const savedProject = new Project();
    savedProject.id = 1;
    savedProject.name = createProjectDto.projectName;
    savedProject.description = createProjectDto.projectDescription;
    savedProject.idCompany = createProjectDto.companyId;
    savedProject.date = createProjectDto.projectDate;

    jest.spyOn(projectRepository, 'save').mockResolvedValue(savedProject);

    const result = await projectService.createProject(createProjectDto);

    expect(result).toEqual(savedProject);
  });
});
