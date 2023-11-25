import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GenericRequestDelegatedService } from './services/generic-request-delegated.service';
import { GenericController } from './controllers/generic.controller';
import { MicroserviceClientService } from '../microservice-manager/services/microservice-client.service';

@Module({
  imports: [HttpModule],
  controllers: [GenericController],
  providers: [Logger, GenericRequestDelegatedService, MicroserviceClientService],
  exports: [MicroserviceClientService],
})
export class GenericDelegateModule {}
