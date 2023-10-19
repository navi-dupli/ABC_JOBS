import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'test' })
export class Tests {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: true })
  active: boolean;

}
