import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('assessment')
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1024, default: '', unique: true })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
