import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Section } from './section.entity';
import { Question } from 'src/question/question.entity';
import { QuestionService } from 'src/question/question.service';
import { Score } from 'src/score/score.entity';
import { ScoreService } from 'src/score/score.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    private readonly questionService: QuestionService,
    private readonly scoreService: ScoreService,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<Section[]> {
    return this.sectionRepository.find();
  }

  async findByAssessment(assessment_id: number): Promise<Section[]> {
    const options: FindOneOptions<Section> = {
      where: { assessmentId: assessment_id },
    };
    return this.sectionRepository.find(options);
  }

  async findOne(id: number): Promise<Section> {
    // Create a FindOneOptions object with the id value
    const options: FindOneOptions<Section> = {
      where: { id },
    };
    return this.sectionRepository.findOne(options);
  }

  async remove(id: number): Promise<boolean> {
    // Check question is exist
    const questions: Question[] = await this.questionService.findBySection(id);
    if (questions.length > 0) return false;

    // Check score is exist
    const scores: Score[] = await this.scoreService.findBySection(id);
    if (scores.length > 0) return false;

    await this.sectionRepository.delete(id);
    return true;
  }

  async create(section: Section): Promise<Section> {
    if (section.title) {
      const sectionExist = await this.sectionRepository.findOne({
        where: { title: section.title },
      });

      if (sectionExist) {
        return sectionExist;
      } else {
        return this.sectionRepository.save(section);
      }
    }

    return null;
  }

  async update(id: string, section: Section) {
    this.sectionRepository.update(id, section);
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
