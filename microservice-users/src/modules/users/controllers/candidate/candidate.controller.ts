import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { CandidateService } from '../../services/candidate/candidate.service';
import { User } from '../../entities/user.entity';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  async search(
    @Query('skills', new ParseArrayPipe({ items: String, separator: ',', optional: true })) skills: number[] = [],
  ): Promise<User[]> {
    return await this.candidateService.search(skills);
  }
}
