import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';

import { Assessment } from 'src/assessment/assessment.entity';

@Entity('section')
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1024, default: '', unique: true })
  title: string;

  @Column()
  @Index()
  assessmentId: number;

  @ManyToOne(() => Assessment)
  @JoinColumn()
  assessment: Assessment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
