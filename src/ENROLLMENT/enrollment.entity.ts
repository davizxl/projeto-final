import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from '../course/course.entity';
import { Collaborator } from '../collaborator/collaborator.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  enrollmentDate: string;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  course: Course;

  @ManyToOne(() => Collaborator, (collaborator) => collaborator.enrollments, { onDelete: 'CASCADE' })
  collaborator: Collaborator;
}
