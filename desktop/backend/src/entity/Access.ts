import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Devices } from "./Devices";
import { Users } from "./Users";

@Entity()
export class Access {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (users) => users)
  @JoinColumn({ name: "user_id" })
  users: Users;

  @Column()
  user_id: number;

  @ManyToOne(() => Devices, (devices) => devices)
  @JoinColumn({ name: "device_id" })
  devices: Devices;

  @Column()
  device_id: number;
}
