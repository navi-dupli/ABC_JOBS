import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewNotesEntity } from '../entities/interview-notes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewNotesService {
  constructor(
    @InjectRepository(InterviewNotesEntity)
    private readonly interviewNotesRepository: Repository<InterviewNotesEntity>,
  ) {}

  async findByAppointmentId(appointmentId: number, userId: number): Promise<InterviewNotesEntity> {
    const interviewNotes = await this.interviewNotesRepository
      .createQueryBuilder('interviewNotes')
      .innerJoinAndSelect('interviewNotes.appointment', 'appointment')
      .where('appointment.id= :id and (appointment.interviewerId= :userId or appointment.officerId=:userId)', {
        id: appointmentId,
        userId: userId,
      })
      .getOne();

    if (!interviewNotes) {
      throw new UnauthorizedException(
        `Interview notes for appointment with id ${appointmentId} not found for user with id ${userId}`,
      );
    }
    return interviewNotes;
  }
}
