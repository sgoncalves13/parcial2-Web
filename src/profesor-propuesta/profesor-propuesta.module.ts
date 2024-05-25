import { Module } from '@nestjs/common';
import { ProfesorPropuestaService } from './profesor-propuesta.service';
import { ProfesorPropuestaController } from './profesor-propuesta.controller';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity, PropuestaEntity])],
  providers: [ProfesorPropuestaService],
  controllers: [ProfesorPropuestaController]
})
export class ProfesorPropuestaModule {}
