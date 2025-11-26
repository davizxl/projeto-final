import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './collaborator.entity';
import { CreateCollaboratorDto } from './create-collaborator.dto';
import { UpdateCollaboratorDto } from './update-collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private repository: Repository<Collaborator>,
  ) {}

  create(data: CreateCollaboratorDto) {
    const collaborator = this.repository.create(data);
    return this.repository.save(collaborator);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateCollaboratorDto) {
    return this.repository.update(id, data);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
