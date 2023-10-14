import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentificationType } from './entities/identification-type.entity';
import { IdentificationController } from './controllers/identification.controller';
import { IdentificationService } from './services/identification.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdentificationType])],
  controllers: [IdentificationController],
  providers: [IdentificationService],
})
export class IdentificationModule {}
