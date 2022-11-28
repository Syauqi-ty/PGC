import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  level: number;
}
