import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';

@Injectable()
export class CitiesService extends AuthorizedController {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {
    super();
  }

  async findOneById(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id: id } });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async findByRegionId(regionId: number): Promise<City[]> {
    return this.cityRepository.find({ where: { region_id: regionId } });
  }

  async findByRegionIdAndCityName(regionId: number, name: string): Promise<City[]> {
    return this.cityRepository
      .createQueryBuilder('citiesByRegionIdIdByName')
      .where('citiesByRegionIdIdByName.region_id=:regionId and  LOWER(citiesByRegionIdIdByName.name) LIKE :name', {
        regionId: regionId,
        name: `%${name.toLowerCase()}%`,
      })
      .getMany();
  }
}
