import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { CandidateService } from '../../services/candidate/candidate.service';
import { User } from '../../entities/user.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  @ApiQuery({ name: 'skills', type: [Number], required: false })
  @ApiQuery({ name: 'languages', type: [String], required: false })
  @ApiQuery({ name: 'countries', type: [Number], required: false })
  @ApiQuery({ name: 'education', type: [String], required: false })
  @ApiQuery({ name: 'experienceYears', type: [String], required: false })
  async search(
    @Query('skills', new ParseArrayPipe({ items: String, separator: ',', optional: true })) skills: number[] = [],
    @Query('languages', new ParseArrayPipe({ items: String, separator: ',', optional: true })) languages: string[] = [],
    @Query('countries', new ParseArrayPipe({ items: String, separator: ',', optional: true })) countries: number[] = [],
    @Query('education', new ParseArrayPipe({ items: String, separator: ',', optional: true })) education: string[] = [],
    @Query('experienceYears', new ParseArrayPipe({ items: String, separator: ',', optional: true }))
    experienceYears: string[] = [],
  ): Promise<User[]> {
    console.log(skills, languages, countries, education, experienceYears);
    return await this.candidateService.search(skills, languages, countries, education, experienceYears);
  }
}
