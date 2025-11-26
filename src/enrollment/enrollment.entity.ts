import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Collaborator } from '../collaborator/collaborator.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentName: string;

  @Column()
  studentEmail: string;

  @Column()
  studentCpf: string;

  @Column()
  studentPhone: string;


  @Column({ type: 'date' })
  birthDate: string;

  @Column({ type: 'timestamp', nullable: true })
  enrollmentDate?: Date;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE', eager: true })
  course: Course;

  @ManyToOne(() => Collaborator, (collab) => collab.enrollments, { nullable: true })
  collaborator?: Collaborator;

  @CreateDateColumn()
  createdAt: Date;
}
