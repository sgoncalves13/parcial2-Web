import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfesorDto } from './profesor.dto';
import { ProfesorService } from './profesor.service';


@ApiTags('Profesor')
@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  createProfesor(@Body() createprofesorDto: ProfesorDto) {
    return this.profesorService.createProfesor(createprofesorDto);
  }

  @Get(':id')
  findProfesorById(@Param('id') id: number) {
    return this.profesorService.findProfesorById(id);
  }
  
  @Delete('id/:id')
  deleteProfesorById(@Param('id') id: number) {
    return this.profesorService.deleteProfesorById(id);
  }

  @Delete('cedula/:cedula')
  deleteProfesorByCedula(@Param('cedula') cedula: number) {
    return this.profesorService.deleteProfesorByCedula(cedula);
  }

}
