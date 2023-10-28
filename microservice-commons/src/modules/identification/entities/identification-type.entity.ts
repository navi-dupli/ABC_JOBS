import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('identification_types')
export class IdentificationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ default: true })
  status: boolean;
}
