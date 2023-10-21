import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Expertise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job: string;

  @Column({ type: 'date' })
  dateInit: Date;

  @Column({ type: 'date', nullable: true })
  dateEnd: Date;

  @Column({ length: 100 })
  company: string;

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => User, (user) => user.expertise)
  user: User;
}
