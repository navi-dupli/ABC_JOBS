import { Injectable } from '@nestjs/common';
import { MicroserviceStatusLiteDto } from '../dtos/microservice-status-lite.dto';

@Injectable()
export class MicroserviceStatusService {
  private microservicesStatus: Map<string, MicroserviceStatusLiteDto> = new Map<string, MicroserviceStatusLiteDto>();
  private readonly healthIndex: number = process.env.HEALTH_INDEX ? parseFloat(process.env.HEALTH_INDEX) : 0.8;

  constructor() {}

  public setMicroserviceStatus(microservice: string, status: MicroserviceStatusLiteDto) {
    this.microservicesStatus.set(microservice, status);
  }

  public getMicroserviceStatus(microservice: string): MicroserviceStatusLiteDto {
    return this.microservicesStatus.get(microservice);
  }

  public getMicroservicesStatus(): Map<string, MicroserviceStatusLiteDto> {
    return this.microservicesStatus;
  }

  public isMicroserviceHealthy(microservice: string): boolean {
    const microserviceStatusLite = this.microservicesStatus.get(microservice);
    if (microserviceStatusLite) {
      return microserviceStatusLite.index >= this.healthIndex;
    }
    return false;
  }
}
