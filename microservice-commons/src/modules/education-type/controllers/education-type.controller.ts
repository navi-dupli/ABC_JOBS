import {Controller, Get} from '@nestjs/common';
import {EducationTypeService} from "../services/education-type.service";
import {EducationType} from "../entities/education-type.entity";
import {AuthorizedController} from "../../../commons/controllers/authorized/authorized.controller";

@Controller('education-types')
export class EducationTypeController extends AuthorizedController{
  constructor(private readonly educationTypeService: EducationTypeService) {
    super();
  }

  @Get()
  async findAll(): Promise<EducationType[]> {
    return await this.educationTypeService.findAll();
  }

}
