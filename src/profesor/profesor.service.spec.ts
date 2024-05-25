import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { PropuestaService } from '../propuesta/propuesta.service';
import { ProyectoService } from '../proyecto/proyecto.service';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { PropuestaEntity } from '../propuesta/propuesta.entity';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let servicePropuesta: PropuestaService;
  let serviceProyecto: ProyectoService;
  let repository: Repository<ProfesorEntity>;
  let propuestaRepository: Repository<PropuestaEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;
  let profesorList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService, PropuestaService, ProyectoService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    propuestaRepository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    profesorList = [];
    for (let i = 0; i < 5; i++) {
      const profesor = await repository.save({
        cedula: faker.number.int(),
        nombre: faker.person.firstName(),
        grupoinvestigacion: "TICSW",
        numeroextension: faker.number.int()
      });
      profesorList.push(profesor);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //createProfesor

  it('Prueba crear un profesor con grupo de investigación válido', async () => {
    const profesor = await repository.save({
      cedula: faker.number.int(),
      nombre: faker.person.firstName(),
      grupoinvestigacion: "TICSW",
      numeroextension: faker.number.int()
    });
    await service.createProfesor(profesor);
    const createdProfesor = await service.findProfesorById(profesor.id);
    expect(createdProfesor).toBeDefined();
    expect(profesor.cedula).toEqual(createdProfesor.cedula)
    expect(profesor.grupoinvestigacion).toEqual(createdProfesor.grupoinvestigacion)
    expect(profesor.id).toEqual(createdProfesor.id)
    expect(profesor.numeroextension).toEqual(createdProfesor.numeroextension)
    expect(profesor.nombre).toEqual(createdProfesor.nombre)
  });

  it('Prueba crear un profesor con grupo de investigación inválido', async () => {
    const profesorInvalido = {
      cedula: faker.number.int(),
      nombre: faker.person.firstName(),
      grupoinvestigacion: "INVALIDO", 
      numeroextension: faker.number.int()
    };
  
    await expect(service.createProfesor(profesorInvalido)).rejects.toThrow(BadRequestException);
  });

  
  //findProfesorById

  it('Prueba buscar un profesor por su id válido', async () => {
    const profesor = profesorList[0]

    const foundProfesor = await service.findProfesorById(profesor.id);
  
    expect(foundProfesor).toBeDefined();
    expect(profesor.cedula).toEqual(foundProfesor.cedula)
    expect(profesor.grupoinvestigacion).toEqual(foundProfesor.grupoinvestigacion)
    expect(profesor.id).toEqual(foundProfesor.id)
    expect(profesor.numeroextension).toEqual(foundProfesor.numeroextension)
    expect(profesor.nombre).toEqual(foundProfesor.nombre)
  });

  it('Prueba buscar un profesor por su id inválido o no existente', async () => {

    let id = 0; // No hay profesor con id 0

    const foundProfesor: ProfesorEntity = await service.findProfesorById(id);
  
    expect(foundProfesor).toBeNull();
  });

  //deleteProfesorById

  it('Prueba de eliminar un profesor por su id que NO tiene una propuesta que tiene un proyecto asociado', async () => {

    const profesor: ProfesorEntity = profesorList[0]
    await service.deleteProfesorById(profesor.id);
    const deletedProfesor = await service.findProfesorById(profesor.id)
    expect(deletedProfesor).toBeNull();
  });

  it('Prueba de eliminar un profesor por su id que SI tiene una propuesta que tiene un proyecto asociado', async () => {

    const proyecto: ProyectoEntity = {
      id: 1,
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      URL: String(faker.internet.url), 
      estudiante: null,
      propuesta: null
    };


    const propuesta: PropuestaEntity = {
      id: 1,
      titulo: faker.string.alphanumeric(),
      descripcion: faker.string.alphanumeric(), 
      palabraclave: faker.string.alphanumeric(),
      proyecto: proyecto,
      profesor: null
    };

    let prop: PropuestaEntity[] = []

    prop.push(propuesta)
    
    const profesor = await repository.save({
      cedula: faker.number.int(),
      nombre: faker.person.firstName(),
      grupoinvestigacion: "TICSW",
      numeroextension: faker.number.int(),
    });

    //Asociamos la propuesta
    profesor.propuestas = prop

    await proyectoRepository.save(proyecto);
    await propuestaRepository.save(propuesta);

    const savedProfesor = await repository.save(profesor);

    const loadedProfesor = await service.findProfesorById(savedProfesor.id);
  
    await expect(service.deleteProfesorById(loadedProfesor.id)).rejects.toThrow(BadRequestException);
  });


  //deleteProfesorByCedula

  it('Prueba de eliminar un profesor por su cedula que NO tiene una propuesta que tiene un proyecto asociado', async () => {

    const profesor: ProfesorEntity = profesorList[0]
    await service.deleteProfesorByCedula(profesor.cedula);
    const deletedProfesor = await service.findProfesorById(profesor.id)
    expect(deletedProfesor).toBeNull();
  });

  it('Prueba de eliminar un profesor por su cedula que SI tiene una propuesta que tiene un proyecto asociado', async () => {

    const proyecto: ProyectoEntity = {
      id: 1,
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      URL: String(faker.internet.url), 
      estudiante: null,
      propuesta: null
    };


    const propuesta: PropuestaEntity = {
      id: 1,
      titulo: faker.string.alphanumeric(),
      descripcion: faker.string.alphanumeric(), 
      palabraclave: faker.string.alphanumeric(),
      proyecto: proyecto,
      profesor: null
    };

    let prop: PropuestaEntity[] = []

    prop.push(propuesta)
    
    const profesor = await repository.save({
      cedula: faker.number.int(),
      nombre: faker.person.firstName(),
      grupoinvestigacion: "TICSW",
      numeroextension: faker.number.int(),
    });

    //Asociamos la propuesta
    profesor.propuestas = prop

    await proyectoRepository.save(proyecto);
    await propuestaRepository.save(propuesta);

    const savedProfesor = await repository.save(profesor);

    const loadedProfesor = await service.findProfesorById(savedProfesor.id);
  
    await expect(service.deleteProfesorByCedula(loadedProfesor.cedula)).rejects.toThrow(BadRequestException);
  });

});
