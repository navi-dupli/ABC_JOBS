import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column({ name: 'process_name' })
  processName: string;

  @Column({ name: 'process_id' })
  processId: number;

  @Column({ name: 'interviewer_id' })
  interviewerId: number;

  @Column({ name: 'interviewer_name' })
  interviewerName: string;

  @Column({ name: 'candidate_id' })
  candidateId: number;

  @Column({ name: 'candidate_name' })
  candidateName: string;

  @Column({ name: 'officer_id' })
  officerId: number;

  @Column({ name: 'officer_name' })
  officerName: string;
}
