import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  description: string;

  @Column({ default: 'active' })
  status: string;

  @Column()
  idCompany: number;

  @Column({ type: 'date' })
  date: Date;
}
