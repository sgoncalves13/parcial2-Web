import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudianteList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    estudianteList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante = await repository.save({
        nombre: faker.person.firstName(),
        codigoestudiante: faker.string.numeric(10),
        creditosaprobados: faker.number.int()
      });
      estudianteList.push(estudiante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //createEstudiante

  it('Prueba crear un estudiante con código de estudiante válido (de longitud 10)', async () => {
    const estudiante = await repository.save({
      nombre: faker.person.firstName(),
      codigoestudiante: faker.string.numeric(10),
      creditosaprobados: faker.number.int()
    });
    await service.createEstudiante(estudiante);
    const createdEstudiante = await service.findEstudianteById(estudiante.id);
    expect(createdEstudiante).toBeDefined();
    expect(estudiante.nombre).toEqual(createdEstudiante.nombre)
    expect(estudiante.codigoestudiante).toEqual(createdEstudiante.codigoestudiante)
    expect(estudiante.creditosaprobados).toEqual(createdEstudiante.creditosaprobados)
  });

  it('Prueba crear un estudiante con código de estudiante inválido (de longitud diferente de 10)', async () => {
    const estudiante = await repository.save({
      nombre: faker.person.firstName(),
      codigoestudiante: faker.string.numeric(5),
      creditosaprobados: faker.number.int()
    });

    await expect(service.createEstudiante(estudiante)).rejects.toThrow(BadRequestException);
  });

  //findEstudianteById

  it('Prueba buscar un estudiante por su id válido', async () => {
    const estudiante = estudianteList[0]

    const foundEstudiante = await service.findEstudianteById(estudiante.id);
  
    expect(foundEstudiante).toBeDefined();
    expect(estudiante.nombre).toEqual(foundEstudiante.nombre)
    expect(estudiante.codigoestudiante).toEqual(foundEstudiante.codigoestudiante)
    expect(estudiante.creditosaprobados).toEqual(foundEstudiante.creditosaprobados)
  });

  it('Prueba buscar un estudiante por su id inválido (el estudiante no existe)', async () => {
    let id = 0; // No hay estudiante con id 0

    const foundEstudiante: EstudianteEntity = await service.findEstudianteById(id);
  
    expect(foundEstudiante).toBeNull();
  });
});
