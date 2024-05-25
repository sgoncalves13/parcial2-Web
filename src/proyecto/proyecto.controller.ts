import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoDto } from './proyecto.dto';

@ApiTags('Proyecto')
@Controller('proyecto')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    creatProyecto(@Body() createproyectoDto: ProyectoDto) {
      return this.proyectoService.createProyecto(createproyectoDto);
    }
}
