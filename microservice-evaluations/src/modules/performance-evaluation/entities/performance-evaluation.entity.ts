import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';

@Entity({ name: 'performance_evaluation' })
export class PerformanceEvaluation {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ update: false })
  performance: string;

  @Column({ type: 'date', default: new Date().toISOString(), update: false })
  date: Date;

  @Column({ length: 500, nullable: true, update: false })
  observations: string;

  @Column({ name: 'project_id', type: 'int', update: false })
  project_id: number;

  @Column({ name: 'team_id', type: 'int', update: false })
  team_id: number;

  @Column({ name: 'user_id', type: 'int', update: false })
  user_id: number;

  @Column({ name: 'qualifying_user_id', type: 'int', update: false })
  qualifying_user_id: number;

  @Column({ name: 'dimension_id', type: 'int', update: false })
  dimension_id: number;

  @Column({ select: false, nullable: true, update: false })
  hash: string;

  /**
   * @description This method is called before inserting a new record in the database.
   * It sets the default values for the hash field.
   * @returns void
   */
  @BeforeInsert()
  setDefaultValues() {
    const dataToBeHashed =
      this.performance +
      this.date +
      this.observations +
      this.project_id +
      this.team_id +
      this.user_id +
      this.qualifying_user_id +
      this.dimension_id;
    this.hash = crypto.createHash('sha256').update(dataToBeHashed).digest('hex');
  }
}
