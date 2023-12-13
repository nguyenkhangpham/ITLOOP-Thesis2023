import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MedicalHistory } from './medical-history.entity';
import { Medicine } from './medicine.entity';

@Index('ORDER_PK1', ['id'], {})
@Index('ORDER_FK1', ['medicalHistoryId'], {})
@Index('ORDER_FK2', ['medicineId'], {})
@Entity('order')
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({
    type: 'int',
    name: 'medical_history_id',
  })
  medicalHistoryId: number;

  @Column({
    type: 'int',
    name: 'medicine_id',
  })
  medicineId: number;

  @Column({
    type: 'varchar',
    name: 'user_manual',
    length: 200,
  })
  userManual: string;

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

  @ManyToOne(() => MedicalHistory, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'medical_history_id', referencedColumnName: 'id' })
  medicalHistory: MedicalHistory;

  @ManyToOne(() => Medicine, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'medicine_id', referencedColumnName: 'id' })
  medicine: Medicine;
}
