import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Index('MEDICAL_HISTORY_PK1', ['id'], {})
@Index('MEDICAL_HISTORY_FK1', ['patientId'], {})
@Entity('medical_history', { schema: 'erm' })
export class MedicalHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({
    type: 'int',
    name: 'patient_id',
  })
  patientId: number;

  @Column({
    type: 'varchar',
    name: 'diagnose',
    length: 200,
    default: null,
  })
  diagnoseNow: string;

  @Column({
    type: 'float',
    name: 'pulse',
    default: '00.00',
  })
  pulse: string;

  @Column({
    type: 'float',
    name: 'blood_glucose',
    default: '00.00',
  })
  bloodGlucose: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    default: null,
  })
  deletedAt?: Date;

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id', referencedColumnName: 'id' })
  patient: User;

  @OneToMany(() => Order, (order) => order.medicalHistory, { nullable: true })
  orders: Order[];
}
