// country.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'countries' })
@Unique(['name'])
export class Country {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 10 })
  code: string;
}
