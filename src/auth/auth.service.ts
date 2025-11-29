import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from '../collaborator/collaborator.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Collaborator) private repo: Repository<Collaborator>,
    private jwt: JwtService,
  ) {}

  async validateCollaborator(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user || !user.active) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return null;
    const { passwordHash, ...rest } = user as any;
    return rest;
  }

  async login(email: string, password: string) {
    const user = await this.validateCollaborator(email, password);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    const payload = { sub: (user as any).id, email: (user as any).email };
    return { access_token: this.jwt.sign(payload) };
  }
}
