import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import { CompaniesService } from '../services/companies.service';
import { Request } from 'express';
import { CreateCompanyDto } from '../dto/create-companie.dto';

@Controller('companies')
export class CompaniesController extends AuthorizedController {
  constructor(private readonly companiesService: CompaniesService) {
    super();
  }

  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto, @Req() req: Request): Promise<any> {
    return this.companiesService.createCompany(req, createCompanyDto);
  }
}
