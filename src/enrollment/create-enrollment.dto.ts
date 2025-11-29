import { IsString, IsEmail, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateEnrollmentDto {
  @IsString() @IsNotEmpty() studentName: string;
  @IsEmail() studentEmail: string;
  @IsString() @IsNotEmpty() studentCpf: string;
  @IsString() @IsNotEmpty() studentPhone: string;
  @IsDateString() birthDate: string;

  @Type(() => Number)
  @IsNumber() courseId: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  collaboratorId?: number;

  @IsOptional()
  @IsDateString()
  enrollmentDate?: string;
}
