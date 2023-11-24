import { Body, Controller, Get, Param, ParseArrayPipe, Post, Query } from '@nestjs/common';
import { CandidateService } from '../../services/candidate/candidate.service';
import { User } from '../../entities/user.entity';
import { ApiQuery } from '@nestjs/swagger';
import { AuthorizedController } from '../../../../commons/controllers/authorized/authorized.controller';
import { EducationDto } from '../../../education/dtos/education.dto';
import { Education } from '../../../education/entities/education.entity';
import { plainToInstance } from 'class-transformer';
import { ExperienceDto } from '../../../experience/dtos/experience.dto';
import { Experience } from '../../../experience/entities/experience.entity';
import { LanguageDto } from '../../../userLanguage/dtos/language.dto';
import { UserLanguage } from '../../../userLanguage/entities/userLanguage.entity';
import { UserAbilityDto } from '../../../userAbility/dtos/user-ability.dto';
import { UserAbility } from '../../../userAbility/entities/userAbility.entity';

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

  @Post(':id/education')
  async addEducation(@Param('id') id: number, @Body() educationDto: EducationDto): Promise<Education> {
    const education: Education = plainToInstance(Education, educationDto);
    return await this.candidateService.addEducation(id, education);
  }

  @Post(':id/experience')
  async addExperience(@Param('id') id: number, @Body() experienceDto: ExperienceDto): Promise<Experience> {
    const experience: Experience = plainToInstance(Experience, experienceDto);
    return await this.candidateService.addExperience(id, experience);
  }

  @Post(':id/language')
  async addLanguage(@Param('id') id: number, @Body() languageDto: LanguageDto): Promise<UserLanguage> {
    const language: UserLanguage = plainToInstance(UserLanguage, languageDto);
    return await this.candidateService.addLanguage(id, language);
  }

  @Post(':id/skills')
  async addSkills(@Param('id') id: number, @Body() skillsDto: UserAbilityDto): Promise<UserAbility> {
    const skills: UserAbility = plainToInstance(UserAbility, skillsDto);
    return await this.candidateService.addSkills(id, skills);
  }
}
