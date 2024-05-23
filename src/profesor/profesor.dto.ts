import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class ProfesorDto {
    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;
    
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly grupoinvestigacion: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numeroextension: number;
}
