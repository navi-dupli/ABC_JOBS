import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Education } from '../../education/entities/education.entity';
import { Experience } from '../../experience/entities/experience.entity';
import { UserLanguage } from '../../userLanguage/entities/userLanguage.entity';
import { UserLocation } from '../../userLocation/entities/userLocation.entity';
import { UserAbility } from '../../userAbility/entities/userAbility.entity';
import { UserTest } from '../../user-test/entities/user-test.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  names: string;

  @Column()
  surnames: string;

  @Column()
  email: string;

  @Column({ name: 'auth_id', nullable: true })
  authId: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: false })
  rol: string;

  @Column({ nullable: true })
  company_id: string;

  @Column({ nullable: true })
  identification: string;

  @Column({ nullable: true })
  nameIdentification: string;

  @Column({ nullable: true })
  typeIdentificationId: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  experienceYears: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  dateBirthday: Date;

  @OneToMany(() => Education, (education) => education.user)
  education: Education[];

  @OneToMany(() => Experience, (expertise) => expertise.user)
  experiences: Experience[];

  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
  languages: UserLanguage[];

  @ManyToOne(() => UserLocation, (userLocation) => userLocation.users, { nullable: true })
  location: UserLocation;

  @OneToMany(() => UserAbility, (userAbility) => userAbility.user)
  skills: UserAbility[];

  @OneToMany(() => UserTest, (userTest) => userTest.users)
  userTests: UserTest[];
}
