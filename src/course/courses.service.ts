import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './create-course.dto';
import { UpdateCourseDto } from './update-course.dto';

@Injectable()
export class CoursesService {
  remove(id: number) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.coursesRepository.find({
      where: { active: true },
    });
  }

  create(dto: CreateCourseDto) {
    const course = this.coursesRepository.create(dto);
    return this.coursesRepository.save(course);
  }

  async update(id: number, dto: UpdateCourseDto) {
    const course = await this.coursesRepository.findOne({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Curso não encontrado');
    }

    Object.assign(course, dto);
    return this.coursesRepository.save(course);
  }

  async delete(id: number) {
    const course = await this.coursesRepository.findOne({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Curso não encontrado');
    }

    course.active = false;
    return this.coursesRepository.save(course);
  }
}
