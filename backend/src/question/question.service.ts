import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Question } from './question.entity';
import { Score } from 'src/score/score.entity';
import { ScoreService } from 'src/score/score.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private readonly scoreService: ScoreService,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findByAssessment(assessment_id: number): Promise<Question[]> {
    const options: FindOneOptions<Question> = {
      where: { assessmentId: assessment_id },
    };
    return this.questionRepository.find(options);
  }

  async findBySection(section_id: number): Promise<Question[]> {
    const options: FindOneOptions<Question> = {
      where: { sectionId: section_id },
    };
    return this.questionRepository.find(options);
  }

  async findOne(id: number): Promise<Question> {
    // Create a FindOneOptions object with the id value
    const options: FindOneOptions<Question> = {
      where: { id },
    };
    return this.questionRepository.findOne(options);
  }

  async remove(id: number): Promise<boolean> {
    // Check score is exist
    const question = await this.findOne(id);
    if (question) {
      // Check Section
      const scores: Score[] = await this.scoreService.findBySection(
        question.sectionId,
      );
      if (scores.length > 0) return false;
    }

    await this.questionRepository.delete(id);
    return true;
  }

  async create(question: Question): Promise<Question> {
    if (question.body) {
      const questionExist = await this.questionRepository.findOne({
        where: {
          assessmentId: question.assessmentId,
          sectionId: question.sectionId,
          body: question.body,
        },
      });

      if (questionExist) {
        return questionExist;
      } else {
        return this.questionRepository.save(question);
      }
    }

    return null;
  }

  async update(id: string, question: Question) {
    this.questionRepository.update(id, question);
  }

  getElapseTime(elapsedTime: number) {
    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    // Create an array to store the non-zero time units
    const timeUnits = [];

    // Add non-zero hours to the array
    if (hours > 0) {
      timeUnits.push(`${hours}h`);
    }

    // Add non-zero minutes to the array
    if (minutes > 0) {
      timeUnits.push(`${minutes}m`);
    }

    // Add non-zero seconds to the array
    if (seconds > 0) {
      timeUnits.push(`${seconds}s`);
    }

    // Join the time units array with a space separator
    return timeUnits.join(' ');
  }
}
