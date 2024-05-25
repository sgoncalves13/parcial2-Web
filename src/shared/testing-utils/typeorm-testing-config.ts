/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { ProfesorEntity } from '../../profesor/profesor.entity';
import { PropuestaEntity } from '../../propuesta/propuesta.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [ProfesorEntity, PropuestaEntity, EstudianteEntity, ProyectoEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([ProfesorEntity, PropuestaEntity, EstudianteEntity, ProyectoEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/