import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Assessment } from './assessment.entity';
import { Section } from 'src/section/section.entity';
import { SectionService } from 'src/section/section.service';
import { Question } from 'src/question/question.entity';
import { QuestionService } from 'src/question/question.service';
import { Score } from 'src/score/score.entity';
import { ScoreService } from 'src/score/score.service';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
    private readonly sectionService: SectionService,
    private readonly questionService: QuestionService,
    private readonly scoreService: ScoreService,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<Assessment[]> {
    return this.assessmentRepository.find();
  }

  async findOne(id: number): Promise<Assessment> {
    // Create a FindOneOptions object with the id value
    const options: FindOneOptions<Assessment> = {
      where: { id },
    };
    return this.assessmentRepository.findOne(options);
  }

  async remove(id: number): Promise<boolean> {
    // Check section is exist
    const sections: Section[] = await this.sectionService.findByAssessment(id);
    if (sections.length > 0) return false;

    // Check question is exist
    const questions: Question[] =
      await this.questionService.findByAssessment(id);
    if (questions.length > 0) return false;

    // Check score is exist
    const scores: Score[] = await this.scoreService.findByAssessment(id);
    if (scores.length > 0) return false;

    await this.assessmentRepository.delete(id);
    return true;
  }

  async create(assessment: Assessment): Promise<Assessment> {
    if (assessment.title) {
      const assessmentExist = await this.assessmentRepository.findOne({
        where: { title: assessment.title },
      });

      if (assessmentExist) {
        return null;
      } else {
        return this.assessmentRepository.save(assessment);
      }
    }

    return null;
  }

  async update(id: string, assessment: Assessment) {
    this.assessmentRepository.update(id, assessment);
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
