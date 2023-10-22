import { Module } from '@nestjs/common';
import { EducationTypeController } from './controllers/education-type.controller';
import { EducationTypeService } from './services/education-type.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EducationType} from "./entities/education-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EducationType])],
  controllers: [EducationTypeController],
  providers: [EducationTypeService]
})
export class EducationTypeModule {}
