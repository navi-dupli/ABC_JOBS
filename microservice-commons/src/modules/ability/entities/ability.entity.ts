import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Ability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  state: boolean;

  @Column({ length: 250 })
  description: string;

}