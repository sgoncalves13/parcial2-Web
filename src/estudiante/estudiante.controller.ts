import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto';

@ApiTags('Estudiante')
@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    createEstudiante(@Body() createestudianteDto: EstudianteDto) {
      return this.estudianteService.createEstudiante(createestudianteDto);
    }

    @Get(':id')
    findEstudianteById(@Param('id') id: number) {
      return this.estudianteService.findEstudianteById(id);
    }
}
