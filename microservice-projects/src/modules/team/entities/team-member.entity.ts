import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column({ default: "Activo", nullable: true })
  status: string;

  @Column()
  teamId: number;

}
