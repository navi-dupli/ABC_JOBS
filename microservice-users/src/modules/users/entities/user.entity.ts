import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  names: string;

  @Column()
  surnames: string;

  @Column()
  email: string;

  @Column({ name: 'auth_id', nullable: true })
  authId: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: false })
  rol: string;
}
