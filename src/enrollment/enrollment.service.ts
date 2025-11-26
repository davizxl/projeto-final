
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
    if (!course || (course as any).active === false) {
      throw new BadRequestException('Curso inexistente ou inativo');
    }


    let collaborator: Collaborator | null = null;
    if ((dto as any).collaboratorId) {
      collaborator = await this.collaboratorRepo.findOne({
        where: { id: (dto as any).collaboratorId },
      });

      if (!collaborator) {
        throw new NotFoundException('Colaborador não encontrado');
      }
    }

    
    const payload: Partial<Enrollment> = {
      studentName: (dto as any).studentName,
      studentEmail: (dto as any).studentEmail,
      studentCpf: (dto as any).studentCpf,
      studentPhone: (dto as any).studentPhone,
      birthDate: (dto as any).birthDate,
      course,
    };

    if (collaborator) payload.collaborator = collaborator;

    if ((dto as any).enrollmentDate) {
      const maybeDate = new Date((dto as any).enrollmentDate);
      if (!Number.isNaN(maybeDate.getTime())) {
       
        payload.enrollmentDate = maybeDate;
      }
    }

    const enrollment = this.repository.create(payload);
    const saved = await this.repository.save(enrollment);

    return {
      id: saved.id,
      studentName: saved.studentName,
      studentCpf: saved.studentCpf,
      courseId: saved.course?.id,
      createdAt:
      
        (saved as any).createdAt?.toISOString() ||
        (saved as any).enrollmentDate?.toISOString() ||
        new Date().toISOString(),
    };
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
