import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserAbility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAbility: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.skills)
  user: User;
}
