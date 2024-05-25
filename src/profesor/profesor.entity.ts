/* eslint-disable prettier/prettier */
import { PropuestaEntity } from '../propuesta/propuesta.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn()
        id: number;
            
        @Column()
        cedula: number;

        @Column()
        nombre: string;

        @Column()
        grupoinvestigacion: string;

        @Column()
        numeroextension: number;

        @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
        propuestas: PropuestaEntity[];
}
