import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'results_test' })
export class TechnicalTest {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  state: string;

  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column({ length: 500, nullable: true })
  observations: string;

  @Column({ type: 'decimal', precision: 1 })
  qualify: number;

  @Column({ name: 'qualifying_user_id', type: 'int' })
  qualifying_user_id: number;

  @Column({ name: 'test_id', type: 'int' })
  test_id: number;

}
