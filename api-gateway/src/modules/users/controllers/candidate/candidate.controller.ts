import {Body, Controller, Post, Req} from '@nestjs/common';
import {CreateCandidateDto} from "../../dto/create-candidate.dto";
import {CandidateService} from "../../services/candidate/candidate.service";
import { Request } from 'express';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  async createCandidate(@Body() candidateDto: CreateCandidateDto, @Req() req: Request): Promise<any> {
    return this.candidateService.createCandidate(req, candidateDto);
  }
}
