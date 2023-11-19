import { Controller, Get, Param } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../entities/appointment.entity';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';

@Controller('appointments')
export class AppointmentController extends AuthorizedController {
  constructor(private readonly appointmentService: AppointmentService) {
    super();
  }
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: number): Promise<Appointment[]> {
    return this.appointmentService.findByUserId(userId);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Appointment> {
    return this.appointmentService.findById(id);
  }
}
