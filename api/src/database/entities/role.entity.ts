import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Index('ROLE_PK1', ['id'], {})
@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'name', length: 24 })
  name: string;
}
