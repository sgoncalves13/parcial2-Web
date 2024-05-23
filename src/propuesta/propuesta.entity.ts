/* eslint-disable prettier/prettier */
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropuestaEntity {

    @PrimaryGeneratedColumn()
    id: number;
        
    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    palabraclave: string;

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
    @JoinColumn()
    proyecto: ProyectoEntity;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas)
    profesor: ProfesorEntity;
}
