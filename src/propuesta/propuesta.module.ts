import { Module } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaController } from './propuesta.controller';
import { PropuestaEntity } from './propuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],
  providers: [PropuestaService],
  controllers: [PropuestaController]
})
export class PropuestaModule {}
