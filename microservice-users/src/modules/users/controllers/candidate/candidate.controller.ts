import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { CandidateService } from '../../services/candidate/candidate.service';
import { User } from '../../entities/user.entity';
import { ApiQuery } from '@nestjs/swagger';
import { AuthorizedController } from '../../../../commons/controllers/authorized/authorized.controller';

@Controller('candidate')
export class CandidateController extends AuthorizedController {
  constructor(private readonly candidateService: CandidateService) {
    super();
  }

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
    return await this.candidateService.search(skills, languages, countries, education, experienceYears);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.candidateService.findOne(id);
  }
}
