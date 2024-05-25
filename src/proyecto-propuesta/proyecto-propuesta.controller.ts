import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProyectoPropuestaService } from './proyecto-propuesta.service';

@ApiTags('Proyecto-Propuesta')
@Controller('proyecto-propuesta')
export class ProyectoPropuestaController {
    constructor(private readonly proyectopropuestaService: ProyectoPropuestaService) {}

    @Post(':idProyecto/:idPropuesta')
    creatProyecto(@Param('idProyecto') IdProyecto: number, @Param('idPropuesta') IdPropuesta: number) {
      return this.proyectopropuestaService.addPropuestaProyecto(IdProyecto, IdPropuesta);
    }
}
