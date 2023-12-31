import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-companie.dto';
import { Company } from './entity/company.entity';
import { AuthorizedController } from '../../commons/controllers/authorized/authorized.controller';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('companies')
@ApiBearerAuth() // Agrega el soporte para la autenticación Bearer
export class CompaniesController extends AuthorizedController {
  constructor(private readonly companiesService: CompaniesService) {
    super();
  }

  @Get()
  async getCompanies(): Promise<Company[]> {
    try {
      return await this.companiesService.getCompanies();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companiesService.createCompany(createCompanyDto);
  }

  @Delete('/:id')
  async deleteCompany(@Param('id') id: number): Promise<void> {
    try {
      await this.companiesService.deleteCompany(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
