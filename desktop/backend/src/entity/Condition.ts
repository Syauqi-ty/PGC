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

  @Column({ type: "decimal", precision: 5, scale: 2 })
  temperature: number;

  @Column()
  intensity: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  humidity: number;

  @OneToOne(() => Devices)
  @JoinColumn({ name: "device_id" })
  devices: Devices;

  @Column()
  device_id: number;
}
