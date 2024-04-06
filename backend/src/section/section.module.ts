import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Section } from './section.entity';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { Question } from 'src/question/question.entity';
import { QuestionService } from 'src/question/question.service';
import { Score } from 'src/score/score.entity';
import { ScoreService } from 'src/score/score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, Question, Score]),
    ConfigModule.forRoot(),
  ],
  providers: [SectionService, QuestionService, ScoreService, Logger],
  controllers: [SectionController],
  exports: [SectionService, Logger],
})
export class SectionModule {}
