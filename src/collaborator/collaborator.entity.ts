import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity()
export class Collaborator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.collaborator)
  enrollments: Enrollment[];
}
