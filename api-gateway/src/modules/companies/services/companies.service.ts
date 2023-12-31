import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CompanyCreatedDto, CreateCompanyDto, CreateUserDto } from '../dto/create-companie.dto';
import { MicroserviceClientService } from '../../../commons/modules/microservice-manager/services/microservice-client.service';
import { MicroserviceEnum } from '../../../dynamic-routes.config';
import { Request } from 'express';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(MicroserviceEnum.USERS)
    private readonly usersRestClient: MicroserviceClientService,
    @Inject(MicroserviceEnum.COMPANIES)
    private readonly companiesRestClient: MicroserviceClientService,
  ) {
  }

  async createCompany(request: Request, body: any): Promise<any> {
    const createCompanyDto = body as CreateCompanyDto;
    const company = await this.registerCompany(request, body);
    if (company) {
      const userCreated = await this.registerUser(request, company, createCompanyDto);
      if (userCreated) {
        company['user'] = userCreated;
        return company;
      } else {
        this.deleteCompany(request, company.id);
        throw new HttpException('Error creating user', 500);
      }
    } else {
      throw new HttpException('Error creating company', 500);
    }
  }

  private async registerCompany(request: Request, body: any): Promise<any> {
    try {
      return await this.companiesRestClient.call('/companies', 'POST', request, body).toPromise();
    } catch (error) {
      return null;
    }
  }

  async registerUser(request: Request, company: any, createCompanyDto: CreateCompanyDto): Promise<any> {
    const companyCreated = company as CompanyCreatedDto;
    const userToCreate: CreateUserDto = {
      email: createCompanyDto.representativeEmail,
      password: createCompanyDto.representativePassword,
      company_id: companyCreated.id,
      names: createCompanyDto.representativeName,
      surnames: createCompanyDto.representativeName,
      rol: 'REPRESENTANTE_EMPRESA',
    } as CreateUserDto;

    try {
      return await this.usersRestClient.call('/users', 'POST', request, userToCreate).toPromise();
    } catch (error) {
      return null;
    }
  }

  private deleteCompany(request: Request, id: number): void {
    this.companiesRestClient.call(`/companies/${id}`, 'DELETE', request).toPromise();
  }
}
