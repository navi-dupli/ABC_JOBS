import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'dimension' })
export class DimensionEntity {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column()
  state: string;

}
