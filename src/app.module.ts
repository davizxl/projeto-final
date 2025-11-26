import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from './course/course.entity';
import { Enrollment } from './enrollment/enrollment.entity';
import { Collaborator } from './collaborator/collaborator.entity';

// (adicione aqui módulos de feature quando existirem, p.ex. CoursesModule)
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST') ?? 'localhost',
        port: config.get<number>('DB_PORT') ?? 3306,
        username: config.get<string>('DB_USER') ?? 'root',
        password: config.get<string>('DB_PASS') ?? '',
        database: config.get<string>('DB_NAME') ?? 'projeto_escolamari',
        entities: [Course, Enrollment, Collaborator],
        synchronize: true, 
        logging: ['error', 'schema', 'warn'],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
