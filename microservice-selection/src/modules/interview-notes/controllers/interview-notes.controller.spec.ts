import { Test, TestingModule } from '@nestjs/testing';
import { InterviewNotesController } from './interview-notes.controller';
import { InterviewNotesService } from '../services/interview-notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InterviewNotes } from '../entities/interview.notes';
import { Repository } from 'typeorm';

describe('InterviewNotesController', () => {
  let controller: InterviewNotesController;
  let interviewNotesService: InterviewNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewNotesController],
      providers: [
        InterviewNotesService,
        {
          provide: getRepositoryToken(InterviewNotes),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<InterviewNotesController>(InterviewNotesController);
    interviewNotesService = module.get<InterviewNotesService>(InterviewNotesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call interviewNoteService.findByAppointmentId with the correct id', async () => {
    const appointmentId = 1;
    const expectedInterviewNotes: InterviewNotes = {
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

    jest.spyOn(interviewNotesService, 'findByAppointmentId').mockResolvedValue(expectedInterviewNotes);

    const result = await controller.findByAppointmentId(appointmentId);

    expect(interviewNotesService.findByAppointmentId).toHaveBeenCalledWith(appointmentId);
    expect(result).toEqual(expectedInterviewNotes);
  });
});
