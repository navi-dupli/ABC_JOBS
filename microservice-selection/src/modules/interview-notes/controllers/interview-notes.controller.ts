import { Controller, Get, Param } from '@nestjs/common';
import { InterviewNotesEntity } from '../entities/interview-notes.entity';
import { InterviewNotesService } from '../services/interview-notes.service';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';

@Controller('interview-notes')
export class InterviewNotesController extends AuthorizedController {
  constructor(private readonly interviewNotesService: InterviewNotesService) {
    super();
  }
  @Get('appointment/:appointmentId/:userId')
  findByAppointmentId(
    @Param('appointmentId') appointmentId: number,
    @Param('userId') userId: number,
  ): Promise<InterviewNotesEntity> {
    return this.interviewNotesService.findByAppointmentId(appointmentId, userId);
  }
}
