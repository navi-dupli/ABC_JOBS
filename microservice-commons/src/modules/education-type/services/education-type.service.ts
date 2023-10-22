import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {EducationType} from "../entities/education-type.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class EducationTypeService {
  constructor(
    @InjectRepository(EducationType)
    private readonly educationTypeRepository: Repository<EducationType>,
  ) {
  }

  async findAll(): Promise<EducationType[]> {
    return await this.educationTypeRepository.find();
  }
}
