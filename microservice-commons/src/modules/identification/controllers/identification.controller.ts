import { Controller, Get, Param } from '@nestjs/common';
import { IdentificationService } from '../services/identification.service';
import { IdentificationType } from '../entities/identification-type.entity';

@Controller('identification')
export class IdentificationController {
  constructor(private readonly identificationTypeService: IdentificationService) {}

  @Get()
  async findAllActive(): Promise<IdentificationType[]> {
    return this.identificationTypeService.findAllActive();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<IdentificationType> {
    return this.identificationTypeService.findOneById(id);
  }
}
