import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfesorPropuestaService } from './profesor-propuesta.service';

@ApiTags('Profesor-Propuesta')
@Controller('profesor-propuesta')
export class ProfesorPropuestaController {
    constructor(private readonly profesorpropuestaService: ProfesorPropuestaService) {}

    @Post(':idProfesor/:idPropuesta')
    creatProyecto(@Param('idProfesor') IdProfesor: number, @Param('idPropuesta') IdPropuesta: number) {
      return this.profesorpropuestaService.addProfesorPropuesta(IdProfesor, IdPropuesta);
    }
}
