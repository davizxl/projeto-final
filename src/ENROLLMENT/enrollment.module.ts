import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { Course } from '../course/course.entity';
import { Collaborator } from '../collaborator/collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Course, Collaborator])],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
