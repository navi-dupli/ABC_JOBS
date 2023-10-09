import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-companie.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Verificar si el correo del representante ya existe en la base de datos
    const existingRepresentative = await this.companyRepository.findOne({
      where: { representativeEmail: createCompanyDto.representativeEmail },
    });

    if (existingRepresentative) {
      throw new Error('The representative email already exists in the system.');
    }

    // Crear una nueva empresa
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async getCompanies() {
    return await this.companyRepository.find();
  }
}
