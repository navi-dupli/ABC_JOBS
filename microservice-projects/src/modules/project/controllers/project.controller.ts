import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto'; // Define este DTO según tus necesidades
import { ProjectService } from '../service/project.service';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller'; // Importa el servicio correspondiente

@Controller('projects')
export class ProjectController extends AuthorizedController {
  constructor(private readonly projectService: ProjectService) {
    super();
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectService.createProject(createProjectDto);
    return project;
  }

  @Get('/:idCompany')
  async getProjectsByCompany(@Param('idCompany') idCompany: number) {
    return await this.projectService.getProjectsByCompany(idCompany);
  }

}
