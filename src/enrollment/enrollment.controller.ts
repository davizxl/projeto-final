import { Controller, Post, Body, Get, Param, UseGuards, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { UpdateEnrollmentDto } from './update-enrollment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}


  @Post('enrollments')
  create(@Body() dto: CreateEnrollmentDto) {
    return this.service.create(dto);
  }

 
  @UseGuards(JwtAuthGuard)
  @Get('enrollments')
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('enrollments/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('courses/:id/enrollments')
  findByCourse(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByCourse(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('enrollments/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEnrollmentDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('enrollments/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
