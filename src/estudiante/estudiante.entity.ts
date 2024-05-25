/* eslint-disable prettier/prettier */
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    id: number;
        
    @Column()
    nombre: string;

    @Column()
    codigoestudiante: string;

    @Column()
    creditosaprobados: number;

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
    @JoinColumn()
    proyecto: ProyectoEntity;
}
