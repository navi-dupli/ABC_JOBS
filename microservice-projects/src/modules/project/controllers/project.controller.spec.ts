import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { Repository } from 'typeorm';
import { ProjectService } from '../service/project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a project', async () => {
      const createProjectDto: CreateProjectDto = {
        projectName: 'Test Project',
        projectDescription: 'Test Description',
        companyId: 1,
        projectDate: new Date(),
      };

      const createdProject: Project = {
        id: 1,
        name: createProjectDto.projectName,
        description: createProjectDto.projectDescription,
        idCompany: createProjectDto.companyId,
        date: new Date(),
        status: 'active',
      };

      jest.spyOn(service, 'createProject').mockResolvedValue(createdProject);

      const result = await service.createProject(createProjectDto);

      expect(result).toEqual(createdProject);
    });
  });
});
