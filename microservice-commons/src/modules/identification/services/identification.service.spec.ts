import { Test, TestingModule } from '@nestjs/testing';
import { IdentificationService } from './identification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdentificationType } from '../entities/identification-type.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('IdentificationService', () => {
  let service: IdentificationService;
  let repository: Repository<IdentificationType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentificationService,
        {
          provide: getRepositoryToken(IdentificationType),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<IdentificationService>(IdentificationService);
    repository = module.get<Repository<IdentificationType>>(getRepositoryToken(IdentificationType));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAllActive', () => {
    it('should return active identification types', async () => {
      const expectedIdentificationTypes: IdentificationType[] = [
        { id: 1, code: 'ID1', name: 'Type 1', status: true },
        { id: 2, code: 'ID2', name: 'Type 2', status: true },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(expectedIdentificationTypes);

      const result = await service.findAllActive();

      expect(result).toBe(expectedIdentificationTypes);
    });
  });

  describe('findOneById', () => {
    it('should return an identification type by ID', async () => {
      const typeId = 1;
      const expectedIdentificationType: IdentificationType = { id: typeId, code: 'ID1', name: 'Type 1', status: true };

      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedIdentificationType);

      const result = await service.findOneById(typeId);

      expect(result).toBe(expectedIdentificationType);
    });

    it('should throw NotFoundException if identification type is not found', async () => {
      const typeId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOneById(typeId)).rejects.toThrowError(NotFoundException);
    });
  });
});
