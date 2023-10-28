import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../entities/appointment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let appointmentService: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
    appointmentService = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call appointmentService.findByUserId with the correct userId', async () => {
    const userId = 1;
    const expectedAppointments: Appointment[] = [
      // Define aquí las citas esperadas para el usuario con ID 1
    ];

    // Simulamos la respuesta del servicio
    jest.spyOn(appointmentService, 'findByUserId').mockResolvedValue(expectedAppointments);

    const result = await controller.findByUserId(userId);

    expect(appointmentService.findByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedAppointments);
  });
});
