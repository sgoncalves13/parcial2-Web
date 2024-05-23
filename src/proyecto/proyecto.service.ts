import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoDto } from './proyecto.dto';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ) {}

    async createProyecto(ProyectoDTO: ProyectoDto): Promise<ProyectoEntity> {

        if (ProyectoDTO.fechaFin < ProyectoDTO.fechaInicio){
            throw new BadRequestException("La fecha fin debe ser mayor a la fecha inicio")
        }
        
        const newProyecto = this.proyectoRepository.create(ProyectoDTO);
        return await this.proyectoRepository.save(newProyecto);
      }
}
