import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './create-collaborator.dto';
import { UpdateCollaboratorDto } from './update-collaborator.dto';

@Controller('collaborators')
export class CollaboratorController {
  constructor(private readonly service: CollaboratorService) {}

  @Post()
  create(@Body() dto: CreateCollaboratorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCollaboratorDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
