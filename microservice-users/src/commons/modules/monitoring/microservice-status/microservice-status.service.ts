import { Injectable } from '@nestjs/common';
import { MicroserviceStatusLite } from '../dtos/microservice-status-lite';

@Injectable()
export class MicroserviceStatusService {
  private microservicesStatus: Map<string, MicroserviceStatusLite> = new Map<string, MicroserviceStatusLite>();
  private readonly healthIndex: number = process.env.HEALTH_INDEX ? parseInt(process.env.HEALTH_INDEX) : 0.8;

  constructor() {}

  public setMicroserviceStatus(microservice: string, status: MicroserviceStatusLite) {
    this.microservicesStatus.set(microservice, status);
  }

  public getMicroserviceStatus(microservice: string): MicroserviceStatusLite {
    return this.microservicesStatus.get(microservice);
  }

  public getMicroservicesStatus(): Map<string, MicroserviceStatusLite> {
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
