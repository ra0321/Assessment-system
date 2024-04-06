import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Score } from './score.entity';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  // Create a new score
  // POST /score/create
  @Post('create')
  async create(@Body() score: Score): Promise<Score> {
    console.log(score);
    return this.scoreService.create(score);
  }

  // Find and return all scores
  // GET /score/all
  @Get('all')
  async findAll(): Promise<Score[]> {
    return this.scoreService.findAll();
  }

  // Find and return scores for section
  // GET /score/list/section/:assessment_id/:section_id
  @Get('list/section/:assessment_id/:section_id')
  async findBySection(
    @Param('assessment_id') assessment_id: number,
    @Param('section_id') section_id: number,
  ): Promise<Score[]> {
    if (section_id == 0) {
      if (assessment_id == 0) return this.scoreService.findAll();
      else return this.scoreService.findByAssessment(assessment_id);
    } else return this.scoreService.findBySection(section_id);
  }

  // Find and return scores for user
  // GET /score/list/user/:user_id
  @Get('list/user/:user_id')
  async findByUser(@Param('user_id') user_id: number): Promise<Score[]> {
    return this.scoreService.findByUser(user_id);
  }

  // Find and return a score by id
  // GET /score/:id
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Score> {
    return this.scoreService.findOne(id);
  }

  // Delete a score by id
  // DELETE /score/delete/:id
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.scoreService.remove(id);
  }

  // Update an score by id
  // POST /score/update/:id
  @Post('update/:id')
  async update(@Param('id') id: string, @Body() score: Score): Promise<void> {
    await this.scoreService.update(id, score);
  }
}
