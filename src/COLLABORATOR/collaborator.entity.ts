import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../../enrollment/enrollment.entity';

@Entity()
export class Collaborator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.collaborator)
  enrollments: Enrollment[];
}
