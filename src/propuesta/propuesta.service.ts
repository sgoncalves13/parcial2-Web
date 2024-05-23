import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { PropuestaDto } from './propuesta.dto';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ) {}

    async createPropuesta(PropuestaDTO: PropuestaDto): Promise<PropuestaEntity> {

        if (!PropuestaDTO.titulo || PropuestaDTO.titulo.trim() === ""){
            throw new BadRequestException("El titulo no puede ser vacio")
        }
        
        const newPropuesta = this.propuestaRepository.create(PropuestaDTO);
        return await this.propuestaRepository.save(newPropuesta);
      }
        
      async findPropuestaById(id: number): Promise<PropuestaEntity | undefined> {
        return await this.propuestaRepository.findOne({ where: { id: id }, relations: ['proyecto', 'profesor'] });
      }

      async findAllpropuestas(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({relations: ["proyecto", "profesor"]});
      }
        
      async deletePropuestaById(id: number): Promise<String> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id: id}, relations: ['proyecto', 'profesor']})

        if (propuesta.proyecto !== null){
            throw new BadRequestException("No se puede borrar porque tiene un proyecto")
        }
        await this.propuestaRepository.delete(id);
        return "Propuesta " + id + " eliminado"
      }
}
