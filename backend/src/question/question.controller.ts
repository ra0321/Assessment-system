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
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // Create a new question
  // POST /question/create
  @Post('create')
  async create(@Body() question: Question): Promise<Question> {
    return this.questionService.create(question);
  }

  // Find and return all questions
  // GET /question/all
  @Get('all')
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  // Find and return questions for section
  // GET /question/list/:assessment_id/:section_id
  @Get('list/:assessment_id/:section_id')
  async findByAssessment(
    @Param('assessment_id') assessment_id: number,
    @Param('section_id') section_id: number,
  ): Promise<Question[]> {
    if (section_id == 0) {
      if (assessment_id == 0) return this.questionService.findAll();
      else return this.questionService.findByAssessment(assessment_id);
    } else return this.questionService.findBySection(section_id);
  }

  // Find and return a question by id
  // GET /question/:id
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Question> {
    return this.questionService.findOne(id);
  }

  // Delete a question by id
  // DELETE /question/delete/:id
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.questionService.remove(id);
  }

  // Update an question by id
  // POST /question/update/:id
  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() question: Question,
  ): Promise<void> {
    await this.questionService.update(id, question);
  }
}
