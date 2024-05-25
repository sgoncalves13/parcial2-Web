import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaDto } from './propuesta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Propuestas')
@Controller('propuesta')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Post()
  createPropuesta(@Body() createpropuestaDto: PropuestaDto) {
    return this.propuestaService.createPropuesta(createpropuestaDto);
  }

  @Get('/all')
  findAllPropuestas() {
    return this.propuestaService.findAllpropuestas();
  }

  @Get(':id')
  findPropuestasById(@Param('id') id: number) {
    return this.propuestaService.findPropuestaById(id);
  }
  
  @Delete(':id')
  deletePropuesta(@Param('id') id: number) {
    return this.propuestaService.deletePropuestaById(id);
  }
  
}
