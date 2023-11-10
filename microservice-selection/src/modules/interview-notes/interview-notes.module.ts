import { Module } from '@nestjs/common';
import { InterviewNotesController } from './controllers/interview-notes.controller';
import { InterviewNotesService } from './services/interview-notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewNotesEntity } from './entities/interview-notes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewNotesEntity])],
  controllers: [InterviewNotesController],
  providers: [InterviewNotesService],
})
export class InterviewNotesModule {}
