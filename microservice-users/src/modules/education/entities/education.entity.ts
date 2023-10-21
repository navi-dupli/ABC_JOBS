import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 100 })
  institution: string;

  @Column({ type: 'date' })
  dateInit: Date;

  @Column({ type: 'date', nullable: true })
  dateEnd: Date;

  @ManyToOne(() => User, (user) => user.education)
  // Asume que en Usuario tienes una relación OneToMany llamada educaciones
  user: User;
}
