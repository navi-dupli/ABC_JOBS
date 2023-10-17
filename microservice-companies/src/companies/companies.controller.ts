import {BadRequestException, Body, Controller, Get, Post} from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-companie.dto";
import { Company } from "./entity/company.entity";

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getCompanies(): Promise<Company[]> {
    try {
      return await this.companiesService.getCompanies();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post()
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    try {
      return await this.companiesService.createCompany(createCompanyDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}
