import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

import { Role } from './role.entity';

@Index('USER_PK1', ['id'], {})
@Index('USER_FK1', ['roleId'], {})
@Index('USER_UNIQUE1', ['email'], { unique: true })
@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'role_id' })
  roleId: number;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 200,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 100,
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'full_name',
    length: 200,
    default: null,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    name: 'avatar',
    length: 100,
    default: null,
  })
  avatar: string;

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

  @ManyToOne(() => Role, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;
}
