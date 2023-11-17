import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login/login.controller';
import { CandidateController } from './controllers/candidate/candidate.controller';
import { CandidateService } from './services/candidate/candidate.service';

@Module({
  controllers: [LoginController, CandidateController],
  providers: [CandidateService],
})
export class UsersModule {}
