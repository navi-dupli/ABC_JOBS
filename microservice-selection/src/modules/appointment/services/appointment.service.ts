import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  async findByUserId(userId: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: [
        {
          interviewerId: userId,
        },
        {
          candidateId: userId,
        },
        {
          officerId: userId,
        },
      ],
      order: {
        date: 'DESC',
      },
    });
  }

  async findById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id: id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }
    return appointment;
  }
}
