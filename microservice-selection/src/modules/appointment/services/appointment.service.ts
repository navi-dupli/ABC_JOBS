import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import {In, Repository} from 'typeorm';

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
      ],
    });
  }
}
