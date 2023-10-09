import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
  representativePassword: string;

  @Column()
  phoneNumber: string;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column()
  city: string;
}
