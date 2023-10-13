// country.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Region } from './region.entity';

@Entity({ name: 'countries' })
@Unique(['name'])
export class Country {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 10 })
  code: string;

  @OneToMany(() => Region, (region) => region.country)
  regions: Region[];
}
