import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Assessment } from './assessment.entity';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { Section } from 'src/section/section.entity';
import { SectionService } from 'src/section/section.service';
import { Question } from 'src/question/question.entity';
import { QuestionService } from 'src/question/question.service';
import { Score } from 'src/score/score.entity';
import { ScoreService } from 'src/score/score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assessment, Section, Question, Score]),
    ConfigModule.forRoot(),
  ],
  providers: [
    AssessmentService,
    SectionService,
    QuestionService,
    ScoreService,
    Logger,
  ],
  controllers: [AssessmentController],
  exports: [AssessmentService, Logger],
})
export class AssessmentModule {}
