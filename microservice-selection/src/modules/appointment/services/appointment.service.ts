import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async findById(id: number, userId: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.id = :id', { id: id })
      .andWhere('appointment.interviewerId = :userId or appointment.officerId = :userId ', { userId: userId })
      .getOne();
    if (!appointment) {
      throw new UnauthorizedException(`Cita con id ${id} no existe para el usuario ${userId}`);
    }
    return appointment;
  }
}
