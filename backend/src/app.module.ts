import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AssessmentModule } from './assessment/assessment.module';
import { SectionModule } from './section/section.module';
import { QuestionModule } from './question/question.module';
import { ScoreModule } from './score/score.module';

import { ConfigCustomModule } from './config/config.module';
import { HealthModule } from './health/health.module';

import { User } from './user/user.entity';
import { Assessment } from './assessment/assessment.entity';
import { Section } from './section/section.entity';
import { Question } from './question/question.entity';
import { Score } from './score/score.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Assessment, Section, Question, Score],
        synchronize: true,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }),
    }),
    UserModule,
    AssessmentModule,
    SectionModule,
    QuestionModule,
    ScoreModule,
    ConfigCustomModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
