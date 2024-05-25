import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ProfesorEntity } from './profesor/profesor.entity';
import { PropuestaEntity } from './propuesta/propuesta.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { ProyectoPropuestaModule } from './proyecto-propuesta/proyecto-propuesta.module';
import { ProfesorPropuestaModule } from './profesor-propuesta/profesor-propuesta.module';

@Module({
  imports: [ EstudianteModule, ProfesorModule, PropuestaModule, ProyectoModule, ProyectoPropuestaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'universidad',
      entities: [EstudianteEntity, ProfesorEntity, PropuestaEntity, ProyectoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    ProfesorModule,
    EstudianteModule,
    PropuestaModule,
    ProyectoModule,
    ProyectoPropuestaModule,
    ProfesorPropuestaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
