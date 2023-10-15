// countries.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findOneById(id: number): Promise<Country> {
    const country = await this.countryRepository.findOne({ where: { id: id } });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  async findByName(name: string): Promise<Country[]> {
    return this.countryRepository
      .createQueryBuilder('countryByName')
      .where('LOWER(countryByName.name) LIKE :name', { name: `%${name.toLowerCase()}%` })
      .getMany();
  }

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }
}
