import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Score } from './score.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<Score[]> {
    return this.scoreRepository.find();
  }

  async findByAssessment(assessment_id: number): Promise<Score[]> {
    const options: FindOneOptions<Score> = {
      where: { assessmentId: assessment_id },
    };
    return this.scoreRepository.find(options);
  }

  async findBySection(section_id: number): Promise<Score[]> {
    const options: FindOneOptions<Score> = {
      where: { sectionId: section_id },
    };
    return this.scoreRepository.find(options);
  }

  async findByUser(user_id: number): Promise<Score[]> {
    const options: FindOneOptions<Score> = {
      where: { userId: user_id },
    };
    return this.scoreRepository.find(options);
  }

  async findOne(id: number): Promise<Score> {
    // Create a FindOneOptions object with the id value
    const options: FindOneOptions<Score> = {
      where: { id },
    };
    return this.scoreRepository.findOne(options);
  }

  async remove(id: number): Promise<boolean> {
    await this.scoreRepository.delete(id);
    return true;
  }

  async create(score: Score): Promise<Score> {
    if (score.assessmentId) {
      const scoreExist = await this.scoreRepository.findOne({
        where: {
          assessmentId: score.assessmentId,
          sectionId: score.sectionId,
          userId: score.userId,
        },
      });

      if (scoreExist) {
        return scoreExist;
      } else {
        return this.scoreRepository.save(score);
      }
    }

    return null;
  }

  async update(id: string, score: Score) {
    this.scoreRepository.update(id, score);
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
