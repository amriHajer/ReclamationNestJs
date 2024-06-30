import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  //@Column()
 // cin: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  tel: number;

  @Column()
  password: string;
}
