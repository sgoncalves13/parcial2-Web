import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class EstudianteDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly codigoestudiante: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly creditosaprobados: number;
}
