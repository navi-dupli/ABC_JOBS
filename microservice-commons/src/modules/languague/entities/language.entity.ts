import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 45})
  name: string;

  @Column({length: 45})
  code: string;

}