import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;
  let proyectoList: ProyectoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    proyectoList = [];
    for (let i = 0; i < 5; i++) {
      const proyecto = await repository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        URL: String(faker.internet.url), 
      });
      proyectoList.push(proyecto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //createProyecto

  it('Prueba crear un proyecto válido (fechaFin es posterior a la fechaInicio)', async () => {
    const proyecto = await repository.save({
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      URL: String(faker.internet.url), 
    });

    await service.createProyecto(proyecto);
    const createdProyecto = await repository.findOne({where: {id: proyecto.id}})
    expect(createdProyecto).toBeDefined();
    expect(proyecto.fechaInicio).toEqual(createdProyecto.fechaInicio)
    expect(proyecto.fechaFin).toEqual(createdProyecto.fechaFin)
    expect(proyecto.URL).toEqual(createdProyecto.URL)
  });

  it('Prueba crear un proyecto inválido (fechaFin es inferior a la fechaInicio)', async () => {
    const proyectoInvalido = await repository.save({
      fechaInicio: new Date(2024, 12, 1),
      fechaFin: new Date(2024, 0, 1),
      URL: String(faker.internet.url), 
    });
    
    await expect(service.createProyecto(proyectoInvalido)).rejects.toThrow(BadRequestException);
  });
});
