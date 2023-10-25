import { Injectable } from '@nestjs/common';
import { UserTest } from '../entities/user-test.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTestService {
  constructor(
    @InjectRepository(UserTest)
    private readonly userTestRepository: Repository<UserTest>,
  ) {}

  async findByTest(testId: number): Promise<UserTest[]> {
    return await this.userTestRepository.find({
      relations: {
        users: true,
      },
      where: {
        idTest: testId,
      },
    });
  }
}
