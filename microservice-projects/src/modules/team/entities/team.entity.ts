import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Activo' })
  status: string;

  @Column()
  projectId: number;

  @Column()
  name: string;

}
