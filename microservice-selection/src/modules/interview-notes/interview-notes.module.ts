import { Module } from '@nestjs/common';
import { InterviewNotesController } from './controllers/interview-notes.controller';
import { InterviewNotesService } from './services/interview-notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewNotes } from './entities/interview.notes';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewNotes])],
  controllers: [InterviewNotesController],
  providers: [InterviewNotesService],
})
export class InterviewNotesModule {}
