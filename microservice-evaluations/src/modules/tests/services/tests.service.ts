import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import {Tests} from "../entities/tests.entity";

@Injectable()
export class TestsService extends AuthorizedController {
  constructor(
    @InjectRepository(Tests)
    private readonly testRepository: Repository<Tests>,
  ) {
    super();
  }

  findAll(): Promise<Tests[]> {
    return this.testRepository.find();
  }
 
}
