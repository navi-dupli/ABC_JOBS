import { Controller, Get, Param } from '@nestjs/common';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import {TestsService} from "../services/tests.service";
import {Tests} from "../entities/tests.entity";

@Controller('tests')
export class TestsController extends AuthorizedController {
  constructor(private readonly testsService: TestsService) {
    super();
  }

  @Get('')
  async findAll(): Promise<Tests[]> {
    console.log(this.testsService.findAll())
    return this.testsService.findAll();
  }
}
