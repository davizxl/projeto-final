import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './create-course.dto';
import { UpdateCourseDto } from './update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Buscar todos os cursos
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  // Criar novo curso
  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  // Atualizar curso por ID
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, dto);
  }

  // "Deletar" curso — mas só desativando (active = false)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coursesService.remove(id);
  }
}
