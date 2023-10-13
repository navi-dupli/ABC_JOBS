import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
import { City } from './city.entity';

@Entity({ name: 'regions' })
export class Region {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 10 })
  code: string;

  @Column({ name: 'country_id', type: 'int' })
  country_id: number;

  @ManyToOne(() => Country, (country) => country.regions)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => City, (city) => city.region)
  cities: City[];
}
