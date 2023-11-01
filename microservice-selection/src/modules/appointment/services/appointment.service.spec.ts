import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
});
