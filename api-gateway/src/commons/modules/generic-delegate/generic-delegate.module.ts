import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GenericRequestDelegatedService } from './generic-request-delegated.service';
import { GenericController } from './generic.controller';
import { MicroserviceClientService } from './microservice-client.service';

@Module({
  imports: [HttpModule, HttpModule],
  controllers: [GenericController],
  providers: [Logger, GenericRequestDelegatedService, MicroserviceClientService],
  exports: [MicroserviceClientService],
})
export class GenericDelegateModule {}
