import { Controller, Get, Param } from '@nestjs/common';
import { InterviewNotes } from '../entities/interview.notes';
import { InterviewNotesService } from '../services/interview-notes.service';

@Controller('interview-notes')
export class InterviewNotesController {
  constructor(private readonly interviewNotesService: InterviewNotesService) {}
  @Get('appointment/:appointmentId')
  findByAppointmentId(@Param('appointmentId') appointmentId: number): Promise<InterviewNotes> {
    return this.interviewNotesService.findByAppointmentId(appointmentId);
  }
}
