import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCity: number;

  @Column()
  idRegion: number;

  @Column()
  idCountry: number;

  @Column({ length: 45 })
  nameCity: string;

  @Column({ length: 45 })
  nameRegion: string;

  @Column({ length: 45 })
  nameCountry: string;

  @OneToMany(() => User, (user) => user.location)
  users: User[];
}
