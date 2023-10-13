import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async findOneById(id: number): Promise<Region> {
    const region = await this.regionRepository.findOne({ where: { id: id } });
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    return region;
  }

  async findByCountryId(countryId: number): Promise<Region[]> {
    return this.regionRepository.find({ where: { country_id: countryId } });
  }

  async findByCountryIdAndRegionName(countryId: number, name: string): Promise<Region> {
    const region = await this.regionRepository.findOne({ where: { country_id: countryId, name: name } });
    if (!region) {
      throw new NotFoundException(`Region with country ID ${countryId} and name ${name} not found`);
    }
    return region;
  }
}
