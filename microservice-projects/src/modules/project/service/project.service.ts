import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new Project();
    project.name = createProjectDto.projectName;
    project.description = createProjectDto.projectDescription;
    project.idCompany = createProjectDto.companyId;
    project.date = createProjectDto.projectDate;

    return this.projectRepository.save(project);
  }
}
