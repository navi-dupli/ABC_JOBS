import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewNotesEntity } from '../entities/interview-notes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewNotesService {
  constructor(
    @InjectRepository(InterviewNotesEntity)
    private readonly interviewNotesRepository: Repository<InterviewNotesEntity>,
  ) {}

  async findByAppointmentId(appointmentId: number): Promise<InterviewNotesEntity> {
    const interviewNotes = await this.interviewNotesRepository.findOne({
      relations: {
        appointment: true,
      },
      where: {
        appointment: { id: appointmentId },
      },
    });
    if (!interviewNotes) {
      throw new NotFoundException(`Interview notes for appointment with id ${appointmentId} not found`);
    }
    return interviewNotes;
  }
}
