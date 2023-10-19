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
    project.name = createProjectDto.name;
    project.description = createProjectDto.description;
    project.idCompany = createProjectDto.idCompany;
    project.date = createProjectDto.date;

    return this.projectRepository.save(project);
  }
}
