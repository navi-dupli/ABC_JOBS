// identification-type.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdentificationType } from '../entities/identification-type.entity';

@Injectable()
export class IdentificationService {
  constructor(
    @InjectRepository(IdentificationType)
    private readonly identificationTypeRepository: Repository<IdentificationType>,
  ) {}

  async findAllActive(): Promise<IdentificationType[]> {
    return this.identificationTypeRepository.find({ where: { status: true } });
  }

  async findOneById(id: number): Promise<IdentificationType> {
    const identificationType = await this.identificationTypeRepository.findOne({ where: { id: id } });
    if (!identificationType) {
      throw new NotFoundException(`Identification type with ID ${id} not found`);
    }
    return identificationType;
  }
}
