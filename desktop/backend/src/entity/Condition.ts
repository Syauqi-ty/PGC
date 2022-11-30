import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Devices } from "./Devices";

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  temperature: number;

  @Column()
  intensity: number;

  @Column()
  humidity: number;

  @OneToOne(() => Devices)
  @JoinColumn({ name: "device_id" })
  devices: Devices;

  @Column()
  device_id: number;
}
