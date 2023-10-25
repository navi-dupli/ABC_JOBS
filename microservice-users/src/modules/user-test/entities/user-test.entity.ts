import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_test' })
  idTest: number;

  @ManyToOne(() => User, (user) => user.userTests)
  users: User[];
}
