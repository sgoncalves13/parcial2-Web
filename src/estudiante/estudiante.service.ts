import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteDto } from './estudiante.dto';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ) {}

    async createEstudiante(EstudianteDTO: EstudianteDto): Promise<EstudianteEntity> {

        if (EstudianteDTO.codigoestudiante.length !== 10){
            throw new BadRequestException("El codigo debe tener 10 caracteres")
        }
        const newEstudiante = this.estudianteRepository.create(EstudianteDTO);
        return await this.estudianteRepository.save(newEstudiante);
      }

    async findEstudianteById(id: number): Promise<EstudianteEntity | undefined> {
        return await this.estudianteRepository.findOne({ where: { id: id }, relations: ['proyecto'] });
    }
}
