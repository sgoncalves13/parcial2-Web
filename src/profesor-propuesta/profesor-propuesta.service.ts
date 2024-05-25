import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorPropuestaService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
    
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ) {}

    async addProfesorPropuesta(ProfesorId: number, PropuestaId: number): Promise<ProfesorEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id: PropuestaId}, relations: ["proyecto", "profesor"]})
        if (!propuesta)
          throw new BadRequestException("No se encontró la propuesta con ese id")
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id: ProfesorId}, relations: ["propuestas"]});
        if (!profesor)
          throw new BadRequestException("No se encontró el proyecto con ese id")
    
        profesor.propuestas = [...profesor.propuestas, propuesta];
        return await this.profesorRepository.save(profesor);
      }
}
