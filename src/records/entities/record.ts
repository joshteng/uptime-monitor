import { Entity, Column, PrimaryGeneratedColumn, Index, UpdateDateColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  serviceName: string;

  // if within threshold dont alert
  // same as seconds before first alert
  @Column()
  secondsBetweenHeartbeat: number;

  // after first alert what interval to alert
  @Column()
  secondsBetweenAlerts: number;

  @Column({ default: 1 })
  maxAlertsPerDownTime: number;

  @Column({ default: 0 })
  numberOfAlerts: number;

  @Index()
  @Column({ default: true })
  isActive: boolean;

  @Column()
  lastAlertAt: string;

  @Column()
  updatedAt: string;
}
