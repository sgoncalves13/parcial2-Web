import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoPropuestaService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>,
    
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ) {}

    async addPropuestaProyecto(ProyectoId: number, PropuestaId: number): Promise<PropuestaEntity> {
        const proyecto: ProyectoEntity = await this.proyectoRepository.findOne({where: {id: ProyectoId}, relations: ["estudiante", "propuesta"]});
        if (!proyecto)
          throw new BadRequestException("No se encontró el proyecto con ese id")
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id: PropuestaId}, relations: ["proyecto", "profesor"]})
        if (!propuesta)
          throw new BadRequestException("No se encontró la propuesta con ese id")
    
        propuesta.proyecto = proyecto;
        return await this.propuestaRepository.save(propuesta);
      }
}
