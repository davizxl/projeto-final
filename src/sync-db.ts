import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { Course } from 'src/course/course.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Collaborator } from 'src/collaborator/collaborator.entity';

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'projeto_escolamari',
  entities: [Course, Enrollment, Collaborator],
  synchronize: true,
  logging: true,
});

ds.initialize()
  .then(async () => {
    console.log('DataSource inicializado — sincronizando...');
    await ds.synchronize();
    console.log('Sincronização concluída');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Erro ao inicializar DataSource:', err);
    process.exit(1);
  });
