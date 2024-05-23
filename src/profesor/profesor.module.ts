import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity, PropuestaEntity])],
  providers: [ProfesorService]
})
export class ProfesorModule {}
