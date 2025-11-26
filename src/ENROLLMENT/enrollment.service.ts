import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { UpdateEnrollmentDto } from './update-enrollment.dto';
import { Course } from '../course/course.entity';
import { Collaborator } from '../collaborator/collaborator.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private repository: Repository<Enrollment>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,

    @InjectRepository(Collaborator)
    private collaboratorRepo: Repository<Collaborator>,
  ) {}

  async create(dto: CreateEnrollmentDto) {
    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
    const collaborator = await this.collaboratorRepo.findOne({ where: { id: dto.collaboratorId } });

    const enrollment = this.repository.create({
      enrollmentDate: dto.enrollmentDate,
      course,
      collaborator,
    });

    return this.repository.save(enrollment);
  }

  findAll() {
    return this.repository.find({ relations: ['course', 'collaborator'] });
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['course', 'collaborator'] });
  }

  update(id: number, dto: UpdateEnrollmentDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
