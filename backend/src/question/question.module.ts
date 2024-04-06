import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Score } from 'src/score/score.entity';
import { ScoreService } from 'src/score/score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Score]),
    ConfigModule.forRoot(),
  ],
  providers: [QuestionService, ScoreService, Logger],
  controllers: [QuestionController],
  exports: [QuestionService, Logger],
})
export class QuestionModule {}
