import { Controller, Get, Param } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../entities/appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: number): Promise<Appointment[]> {
    return this.appointmentService.findByUserId(userId);
  }
}
