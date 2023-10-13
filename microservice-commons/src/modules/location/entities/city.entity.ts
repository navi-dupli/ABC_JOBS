import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './region.entity';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  region_id: number;

  @Column({ type: 'smallint' })
  country_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => Region, (region) => region.cities)
  @JoinColumn({ name: 'region_id' })
  region: Region;
}
