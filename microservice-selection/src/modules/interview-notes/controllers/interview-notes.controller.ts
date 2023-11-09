import { Controller, Get, Param } from '@nestjs/common';
import { InterviewNotesEntity } from '../entities/interview-notes.entity';
import { InterviewNotesService } from '../services/interview-notes.service';

@Controller('interview-notes')
export class InterviewNotesController {
  constructor(private readonly interviewNotesService: InterviewNotesService) {}
  @Get('appointment/:appointmentId')
  findByAppointmentId(@Param('appointmentId') appointmentId: number): Promise<InterviewNotesEntity> {
    return this.interviewNotesService.findByAppointmentId(appointmentId);
  }
}
