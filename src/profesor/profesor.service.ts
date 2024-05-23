import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorDto } from './profesor.dto';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,

        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>


    ) {}

    async createProfesor(ProfesorDTO: ProfesorDto): Promise<ProfesorEntity> {

        if (ProfesorDTO.grupoinvestigacion !== "TICSW" && ProfesorDTO.grupoinvestigacion !== "IMAGINE" && ProfesorDTO.grupoinvestigacion !== "COMIT"){
            throw new BadRequestException("El grupo de investigacion esta mal")
        }
        const newProfesor = this.profesorRepository.create(ProfesorDTO);
        return await this.profesorRepository.save(newProfesor);
      }
        
      async findProfesorById(id: number): Promise<ProfesorEntity | undefined> {
        return await this.profesorRepository.findOne({ where: { id: id }, relations: ['propuestas'] });
      }
        
      async deleteProefsorById(id: number): Promise<String> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id: id}, relations: ['propuestas']})
        const propuestas = profesor.propuestas
        for ( let i = 0; i < propuestas.length; i++ ) {
            const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id: propuestas[i].id}, relations: ['proyecto', 'profesor']})
            if (propuesta.proyecto !== null){
                throw new BadRequestException("No se puede borrar hay un proyecto asociado")
            }

        }
        await this.profesorRepository.delete(id);
        return "Profesor " + id + " eliminado"
      }

      async deleteProefsorByCedula(cedula: number): Promise<String> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {cedula: cedula}, relations: ['propuestas']})
        const propuestas = profesor.propuestas
        for ( let i = 0; i < propuestas.length; i++ ) {
            const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id: propuestas[i].id}, relations: ['proyecto', 'profesor']})
            if (propuesta.proyecto !== null){
                throw new BadRequestException("No se puede borrar hay un proyecto asociado")
            }

        }
        await this.profesorRepository.delete(cedula);
        return "Profesor con cedula: " + cedula + " eliminado"
      }
}
