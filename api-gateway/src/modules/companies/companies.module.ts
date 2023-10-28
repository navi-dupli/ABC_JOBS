import { Module } from '@nestjs/common';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesService } from './services/companies.service';
import { MicroserviceManagerModule } from '../../commons/modules/microservice-manager/microservice-manager.module';

@Module({
  imports: [MicroserviceManagerModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
