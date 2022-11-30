import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Devices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code_device: string;

  @Column()
  alamat: string;
}
