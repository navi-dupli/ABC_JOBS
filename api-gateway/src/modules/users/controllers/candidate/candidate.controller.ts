import {Body, Controller, Param, Post, Req, UseGuards} from '@nestjs/common';
import {CreateCandidateDto} from "../../dto/create-candidate.dto";
import {CandidateService} from "../../services/candidate/candidate.service";
import { Request } from 'express';
import { UserAbilityLanguageDto } from '../../dto/user-ability-language.dto';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  async createCandidate(@Body() candidateDto: CreateCandidateDto, @Req() req: Request): Promise<any> {
    return this.candidateService.createCandidate(req, candidateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post(':id/add-ability-language')
  async addLanguageAndSkill(
    @Param('id') id: number,
    @Body() userAbilityLanguageDto: UserAbilityLanguageDto,
    @Req() req: Request,
  ): Promise<any> {
    return this.candidateService.addLanguageAndSkill(req, id, userAbilityLanguageDto);
  }
}
