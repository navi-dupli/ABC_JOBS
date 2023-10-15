import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { IdentificationController } from './identification.controller';
import { IdentificationService } from '../services/identification.service';
import { IdentificationType } from '../entities/identification-type.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('IdentificationController', () => {
  let controller: IdentificationController;
  let service: IdentificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdentificationController],
      providers: [
        IdentificationService,
        {
          provide: getRepositoryToken(IdentificationType),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<IdentificationController>(IdentificationController);
    service = module.get<IdentificationService>(IdentificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllActive', () => {
    it('should return active identification types', async () => {
      const expectedIdentificationTypes: IdentificationType[] = [
        { id: 1, code: 'ID1', name: 'Type 1', status: true },
        { id: 2, code: 'ID2', name: 'Type 2', status: true },
      ];

      jest.spyOn(service, 'findAllActive').mockResolvedValue(expectedIdentificationTypes);

      const result = await controller.findAllActive();

      expect(result).toBe(expectedIdentificationTypes);
    });
  });

  describe('findOneById', () => {
    it('should return an identification type by ID', async () => {
      const typeId = 1;
      const expectedIdentificationType: IdentificationType = { id: typeId, code: 'ID1', name: 'Type 1', status: true };

      jest.spyOn(service, 'findOneById').mockResolvedValue(expectedIdentificationType);

      const result = await controller.findOneById(typeId);

      expect(result).toBe(expectedIdentificationType);
    });

    it('should throw NotFoundException if identification type is not found', async () => {
      const typeId = 1;

      jest.spyOn(service, 'findOneById').mockRejectedValue(new NotFoundException());

      await expect(controller.findOneById(typeId)).rejects.toThrowError(NotFoundException);
    });
  });
});
