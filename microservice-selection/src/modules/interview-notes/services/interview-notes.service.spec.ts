import { Test, TestingModule } from '@nestjs/testing';
import { InterviewNotesService } from './interview-notes.service';
import { Repository } from 'typeorm';
import { InterviewNotesEntity } from '../entities/interview-notes.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('InterviewNotesService', () => {
  let service: InterviewNotesService;
  let interviewNotesRepository: Repository<InterviewNotesEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewNotesService,
        {
          provide: getRepositoryToken(InterviewNotesEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<InterviewNotesService>(InterviewNotesService);
    interviewNotesRepository = module.get<Repository<InterviewNotesEntity>>(getRepositoryToken(InterviewNotesEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  /*
  it.skip('should find interview notes for the given appointment ID', async () => {
    const appointmentId = 1;
    const expectedInterviewNotes: InterviewNotesEntity = {
      id: 1,
      appointment: {
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
        officerName: 'Luisa Fernández',
      },
      notes: 'The candidate has a lot of experience with React.',
      date: new Date(),
      conclusions: 'The candidate is a good fit for the position.',
    };

    // Simulamos la respuesta del repositorio
    jest.spyOn(interviewNotesRepository, 'findOne').mockResolvedValue(expectedInterviewNotes);

    const result = await service.findByAppointmentId(appointmentId);

    expect(interviewNotesRepository.findOne).toHaveBeenCalledWith({
      relations: {
        appointment: true,
      },
      where: {
        appointment: { id: appointmentId },
      },
    });
    expect(result).toEqual(expectedInterviewNotes);
  });

  it.skip('shouldnt find interview notes for the given appointment ID', async () => {
    const appointmentId = 1;
    jest.spyOn(interviewNotesRepository, 'findOne').mockResolvedValue(null);
    await expect(service.findByAppointmentId(appointmentId)).rejects.toThrow(NotFoundException);
    expect(interviewNotesRepository.findOne).toHaveBeenCalledWith({
      relations: { appointment: true },
      where: { appointment: { id: appointmentId } },
    });
  });*/
});
