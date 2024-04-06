import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Score } from './score.entity';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Score]), ConfigModule.forRoot()],
  providers: [ScoreService, Logger],
  controllers: [ScoreController],
  exports: [ScoreService, Logger],
})
export class ScoreModule {}
