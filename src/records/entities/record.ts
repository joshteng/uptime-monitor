import { Entity, Column, PrimaryGeneratedColumn, Index, UpdateDateColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  serviceName: string;

  @Column()
  secondsBetweenHeartbeat: number;

  @Column()
  minutesBetweenAlerts: number;

  @Column()
  maxAlerts: number;

  @Column({ default: true })
  isActive: boolean;

  @UpdateDateColumn()
  updated_at: Date;
}
