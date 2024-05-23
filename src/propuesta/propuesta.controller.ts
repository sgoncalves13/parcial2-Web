import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';

@Controller('propuesta')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Get('/all')
  findAllPropuestas() {
    return this.propuestaService.findAllpropuestas();
  }
}
