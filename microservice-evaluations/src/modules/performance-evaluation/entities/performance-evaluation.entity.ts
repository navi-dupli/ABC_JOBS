import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'performance_evaluation' })
export class PerformanceEvaluation {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  performance: string;

  @Column({ type: 'date', default: new Date() })
  date: Date;

  @Column({ length: 500, nullable: true })
  observations: string;

  @Column({ name: 'project_id', type: 'int' })
  project_id: number;

  @Column({ name: 'team_id', type: 'int' })
  team_id: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column({ name: 'qualifying_user_id', type: 'int' })
  qualifying_user_id: number;

  @Column({ name: 'dimension_id', type: 'int' })
  dimension_id: number;

}
