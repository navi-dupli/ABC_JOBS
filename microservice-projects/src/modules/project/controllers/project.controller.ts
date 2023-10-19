import { Controller, Post, Body } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto'; // Define este DTO según tus necesidades
import { ProjectService } from '../service/project.service'; // Importa el servicio correspondiente

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectService.createProject(createProjectDto);
    return project;
  }
}
