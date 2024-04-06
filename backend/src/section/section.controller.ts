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
import { Section } from './section.entity';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  // Create a new section
  // POST /section/create
  @Post('create')
  async create(@Body() section: Section): Promise<Section> {
    return this.sectionService.create(section);
  }

  // Find and return all sections
  // GET /section/all
  @Get('all')
  async findAll(): Promise<Section[]> {
    return this.sectionService.findAll();
  }

  // Find and return sections for assessment
  // GET /section/list/:assessment_id
  @Get('list/:assessment_id')
  async findByAssessment(
    @Param('assessment_id') assessment_id: number,
  ): Promise<Section[]> {
    if (assessment_id == 0) return this.sectionService.findAll();
    else return this.sectionService.findByAssessment(assessment_id);
  }

  // Find and return a section by id
  // GET /section/:id
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Section> {
    return this.sectionService.findOne(id);
  }

  // Delete a section by id
  // DELETE /section/delete/:id
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.sectionService.remove(id);
  }

  // Update an section by id
  // POST /section/update/:id
  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() section: Section,
  ): Promise<void> {
    await this.sectionService.update(id, section);
  }
}
