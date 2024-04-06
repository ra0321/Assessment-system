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

import { User } from 'src/user/user.entity';
import { Assessment } from 'src/assessment/assessment.entity';
import { Section } from 'src/section/section.entity';

export interface AnswerDetail {
  questionId: number;
  answer: number[];
}

@Entity('score')
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

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

  @Column({ type: 'decimal', default: 0 })
  totalScore: number;

  @Column({ type: 'jsonb', default: null })
  answer: AnswerDetail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
