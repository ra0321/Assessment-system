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
import { Assessment } from './assessment.entity';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  // Create a new assessment
  // POST /assessment/create
  @Post('create')
  async create(@Body() assessment: Assessment): Promise<Assessment> {
    return this.assessmentService.create(assessment);
  }

  // Find and return all assessments
  // GET /assessment/all
  @Get('all')
  async findAll(): Promise<Assessment[]> {
    return this.assessmentService.findAll();
  }

  // Find and return a assessment by id
  // GET /assessment/:id
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Assessment> {
    return this.assessmentService.findOne(id);
  }

  // Delete a assessment by id
  // DELETE /assessment/delete/:id
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.assessmentService.remove(id);
  }

  // Update an assessment by id
  // POST /assessment/update/:id
  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() assessment: Assessment,
  ): Promise<void> {
    await this.assessmentService.update(id, assessment);
  }
}
