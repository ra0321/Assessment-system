import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Score } from 'src/score/score.entity';
import { ScoreService } from 'src/score/score.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Score]), ConfigModule.forRoot()],
  providers: [UserService, ScoreService, Logger],
  controllers: [UserController],
  exports: [UserService, Logger],
})
export class UserModule {}
