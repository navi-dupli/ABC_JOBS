import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';

@Entity()
export class InterviewNotes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  notes: string;

  @Column()
  conclusions: string;

  @OneToOne(() => Appointment)
  @JoinColumn()
  appointment: Appointment;

  // @OneToOne(() => Appointment, (appointment) => appointment.interviewNote)
  // appointment: Appointment;
}
