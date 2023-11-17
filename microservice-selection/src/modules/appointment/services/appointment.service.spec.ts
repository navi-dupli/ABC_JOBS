import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentRepository: Repository<Appointment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    appointmentRepository = module.get<Repository<Appointment>>(getRepositoryToken(Appointment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find appointments for the given user ID', async () => {
    const userId = 1;
    const expectedAppointments: Appointment[] = [
      // Define aquí las citas esperadas para el usuario con ID 1
    ];

    // Simulamos la respuesta del repositorio
    jest.spyOn(appointmentRepository, 'find').mockResolvedValue(expectedAppointments);

    const result = await service.findByUserId(userId);

    expect(appointmentRepository.find).toHaveBeenCalledWith({
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
    expect(result).toEqual(expectedAppointments);
  });

  it.skip('should find an appointment by ID', async () => {
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

    // Simulamos la respuesta del repositorio
    jest.spyOn(appointmentRepository, 'findOneBy').mockResolvedValue(expectedAppointment);

    const result = await service.findById(id, 1);
    expect(result).toEqual(expectedAppointment);
  });

  it.skip('shouldnt find an appointment by incorrect ID', async () => {
    const id = 1;
    // Simulamos la respuesta del repositorio
    jest.spyOn(appointmentRepository, 'findOneBy').mockResolvedValue(null);
    await expect(service.findById(id, 1)).rejects.toThrow(NotFoundException);
  });
});
