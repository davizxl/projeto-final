import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
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
    if (!course || course.active === false) {
      throw new BadRequestException('Curso inexistente ou inativo');
    }

    let collaborator: Collaborator | null = null;
    if (dto.collaboratorId) {
      collaborator = await this.collaboratorRepo.findOne({ where: { id: dto.collaboratorId } });
      if (!collaborator) throw new NotFoundException('Colaborador não encontrado');
    }

    const payload: Partial<Enrollment> = {
      studentName: dto.studentName,
      studentEmail: dto.studentEmail,
      studentCpf: dto.studentCpf,
      studentPhone: dto.studentPhone,
      birthDate: dto.birthDate,
      course,
    };

    if (collaborator) payload.collaborator = collaborator;

    if (dto.enrollmentDate) {
      const maybeDate = new Date(dto.enrollmentDate);
      if (!Number.isNaN(maybeDate.getTime())) payload.enrollmentDate = maybeDate;
    }

    const enrollment = this.repository.create(payload);
    const saved = await this.repository.save(enrollment);

    return {
      id: saved.id,
      studentName: saved.studentName,
      studentCpf: saved.studentCpf,
      courseId: (saved.course as Course).id,
      createdAt: (saved.createdAt || saved.enrollmentDate || new Date()).toISOString(),
    };
  }

  findAll() {
    return this.repository.find({ relations: ['course', 'collaborator'] });
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['course', 'collaborator'] });
  }

  async findByCourse(courseId: number) {
    return this.repository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.course', 'course')
      .leftJoinAndSelect('e.collaborator', 'collaborator')
      .where('course.id = :courseId', { courseId })
      .orderBy('e.createdAt', 'DESC')
      .getMany();
  }

  update(id: number, dto: UpdateEnrollmentDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
