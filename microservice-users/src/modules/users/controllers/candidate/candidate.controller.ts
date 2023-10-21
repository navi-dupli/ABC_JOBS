import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { CandidateService } from '../../services/candidate/candidate.service';
import { User } from '../../entities/user.entity';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  async search(
    @Query('skills', new ParseArrayPipe({ items: String, separator: ',', optional: true })) skills: number[] = [],
    @Query('languages', new ParseArrayPipe({ items: String, separator: ',', optional: true })) languages: number[] = [],
    @Query('countries', new ParseArrayPipe({ items: String, separator: ',', optional: true })) countries: number[] = [],
    @Query('education', new ParseArrayPipe({ items: String, separator: ',', optional: true })) education: string[] = [],
    @Query('experienceYears', new ParseArrayPipe({ items: String, separator: ',', optional: true }))
    experienceYears: string[] = [],
  ): Promise<User[]> {
    return await this.candidateService.search(skills, languages, countries, education, experienceYears);
  }
}
