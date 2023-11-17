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

  it('should call appointmentService.findById with the correct id', async () => {
    const id = 1;
    const expectedAppointment: Appointment = {
      id: 1,
      title: 'Software Engineer Interview',
      date: new Date(),
      description: 'Initial interview for the software engineering position.',
      processName: 'Software Engineer Hiring',
      processId: 1,
      interviewerId: 7,
      interviewerName: 'Natalie Santiago',
      candidateId: 15,
      candidateName: 'Pedro García',
      officerId: 6,
      officerName: 'Plinio Grijalba',
    };

    // Simulamos la respuesta del servicio
    jest.spyOn(appointmentService, 'findById').mockResolvedValue(expectedAppointment);

    const result = await controller.findById(id, 1);

    expect(appointmentService.findById).toHaveBeenCalledWith(id, 1);
    expect(result).toEqual(expectedAppointment);
  });
});
