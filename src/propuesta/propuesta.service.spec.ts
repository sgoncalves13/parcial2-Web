import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;
  let propuestaList: PropuestaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    propuestaList = [];
    for (let i = 0; i < 5; i++) {
      const propuesta = await repository.save({
        titulo: faker.commerce.productName(),
        descripcion: faker.lorem.paragraph(),
        palabraclave: faker.lorem.word()
      });
      propuestaList.push(propuesta);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

   //createPropuesta

   it('Prueba crear una propuesta con un título válido', async () => {
    const propuesta = await repository.save({
      titulo: faker.commerce.productName(),
      descripcion: faker.lorem.paragraph(),
      palabraclave: faker.lorem.word()
    });
    await service.createPropuesta(propuesta);
    const createdPropuesta = await service.findPropuestaById(propuesta.id);
    expect(createdPropuesta).toBeDefined();
    expect(propuesta.titulo).toEqual(createdPropuesta.titulo)
    expect(propuesta.descripcion).toEqual(createdPropuesta.descripcion)
    expect(propuesta.palabraclave).toEqual(createdPropuesta.palabraclave)
  });

  it('Prueba crear una propuesta con un título inválido (vacío)', async () => {
    const propuestaInvalida = await repository.save({
      titulo: "",
      descripcion: faker.lorem.paragraph(),
      palabraclave: faker.lorem.word()
    });

    expect(service.createPropuesta(propuestaInvalida)).rejects.toThrow(BadRequestException);
  });

  //findPropuestaById

  it('Prueba para obtener una propuesta segun su id', async() =>{
    const propuesta = propuestaList[0]

    const foundPropuesta = await service.findPropuestaById(propuesta.id)

    expect(foundPropuesta).toBeDefined();
    expect(propuesta.titulo).toEqual(foundPropuesta.titulo)
    expect(propuesta.descripcion).toEqual(foundPropuesta.descripcion)
    expect(propuesta.palabraclave).toEqual(foundPropuesta.palabraclave)
  });

  it('Prueba para obtener una propuesta segun su id inválida (que no existe)', async() =>{
    const id = 0; // No hay ninguna propuesta de id 0

    const foundPropuesta = await service.findPropuestaById(id)

    expect(foundPropuesta).toBeNull();
  });

  //findAllPropuestas

  it('Prueba para obtener todas las propuestas', async() =>{
      const propuestas = await service.findAllpropuestas()

      for (let i = 0; i<propuestaList.length; i++){
        let propuesta = propuestas[i];

        expect(propuesta).toBeDefined();
        expect(propuesta.titulo).toEqual(propuestaList[i].titulo)
        expect(propuesta.descripcion).toEqual(propuestaList[i].descripcion)
        expect(propuesta.palabraclave).toEqual(propuestaList[i].palabraclave)
      }
  });

  it('Prueba para obtener todas las propuestas inválido (que la base de datos este vacia)', async() =>{

    await repository.clear();

    const propuestas = await service.findAllpropuestas()

    expect(propuestas).toEqual([]);
    });

  //deletePropuestaById

  it('Prueba para borrar una propuesta válida (que NO tiene un proyecto)', async() =>{

    const propuesta = propuestaList[0]

    await service.deletePropuestaById(propuesta.id)

    const deletedPropuesta = await service.findPropuestaById(propuesta.id)

    expect(deletedPropuesta).toBeNull()

    });

    it('Prueba para borrar una propuesta inválida (que SI tiene un proyecto)', async() =>{

      const proyecto: ProyectoEntity = {
        id: 1,
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        URL: String(faker.internet.url), 
        estudiante: null,
        propuesta: null
      };

      const propuesta = propuestaList[0]

      //Asocia el proyecto a la propuesta
      propuesta.proyecto = proyecto

      await proyectoRepository.save(proyecto);

      const savedPropuesta = await repository.save(propuesta);

      expect(service.deletePropuestaById(savedPropuesta.id)).rejects.toThrow(BadRequestException);
      });

});
