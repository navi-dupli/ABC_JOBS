import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewNotes } from '../entities/interview.notes';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewNotesService {
  constructor(
    @InjectRepository(InterviewNotes)
    private readonly interviewNotesRepository: Repository<InterviewNotes>,
  ) {}

  async findByAppointmentId(appointmentId: number): Promise<InterviewNotes> {
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
