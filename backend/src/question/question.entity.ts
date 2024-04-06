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
import { Section } from 'src/section/section.entity';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2048, default: '' })
  body: string;

  @Column()
  @Index()
  assessmentId: number;

  @ManyToOne(() => Assessment)
  @JoinColumn()
  assessment: Assessment;

  @Column()
  @Index()
  sectionId: number;

  @ManyToOne(() => Section)
  @JoinColumn()
  section: Section;

  @Column({ type: 'jsonb', default: null })
  answer: string[];

  @Column({ type: 'jsonb', default: null })
  correctAnswer: number[];

  @Column({ default: false })
  isMultiple: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
