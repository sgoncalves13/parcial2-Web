import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class ProyectoDto {
    @IsDate()
    @IsNotEmpty()
    readonly fechaInicio: Date;
    
    @IsDate()
    @IsNotEmpty()
    readonly fechaFin: Date;
    
    @IsString()
    @IsNotEmpty()
    readonly URL: string;
}
