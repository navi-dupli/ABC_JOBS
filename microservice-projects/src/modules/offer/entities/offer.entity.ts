import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  hourValue: number;

  @Column()
  date: Date;

  @Column()
  currencyId: number;

  @Column()
  projectId: number;

}
