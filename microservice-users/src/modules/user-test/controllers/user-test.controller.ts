import { Controller, Get, Param } from '@nestjs/common';
import { UserTestService } from '../services/user-test.service';

@Controller('user-test')
export class UserTestController {
  constructor(private readonly serviceUserTest: UserTestService) {}

  @Get('/:testId')
  findByTest(@Param('testId') testId: number): Promise<any> {
    return this.serviceUserTest.findByTest(testId);
  }
}
