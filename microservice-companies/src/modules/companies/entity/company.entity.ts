import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  uniqueIdentification: string;

  @Column()
  businessActivity: string;

  @Column()
  companyEmail: string;

  @Column()
  representativeName: string;

  @Column()
  representativeEmail: string;

  @Column()
  phoneNumber: string;

  @Column()
  country: number;

  @Column()
  region: number;

  @Column()
  city: number;

  @Column()
  address: string;
}
