import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MicroserviceClientService } from './services/microservice-client.service';

@Module({
  imports: [HttpModule],
  providers: [Logger, MicroserviceClientService],
  exports: [MicroserviceClientService],
})
export class MicroserviceManagerModule {}
