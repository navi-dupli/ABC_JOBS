import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceStatusLiteDto } from '../dtos/microservice-status-lite.dto';

@Injectable()
export class MicroserviceStatusService {
  private readonly logger = new Logger(MicroserviceStatusService.name);
  private microservicesStatus: Map<string, MicroserviceStatusLiteDto> = new Map<string, MicroserviceStatusLiteDto>();
  private readonly healthIndex: number = process.env.HEALTH_INDEX ? parseFloat(process.env.HEALTH_INDEX) : 0.8;

  constructor() {}

  public setMicroserviceStatus(microservice: string, status: MicroserviceStatusLiteDto) {
    this.logger.debug(`setMicroserviceStatus: ${microservice} ${JSON.stringify(status, null, 2)}`);
    this.microservicesStatus.set(microservice, status);
  }

  public getMicroserviceStatus(microservice: string): MicroserviceStatusLiteDto {
    return this.microservicesStatus.get(microservice);
  }

  public getMicroservicesStatus(): Map<string, MicroserviceStatusLiteDto> {
    return this.microservicesStatus;
  }

  public isMicroserviceHealthy(microservice: string): boolean {
    this.logger.log(JSON.stringify(this.map(this.microservicesStatus), null, 2));
    this.logger.log(`isMicroserviceHealthy: ${microservice}`);
    const microserviceStatusLite = this.microservicesStatus.get(microservice);
    if (microserviceStatusLite) {
      return microserviceStatusLite.index >= this.healthIndex;
    }
    return false;
  }

  public getMicroserviceStatusDataSet() {
    return this.map(this.microservicesStatus);
  }

  private map(microserviceStatusDtos: Map<string, MicroserviceStatusLiteDto>) {
    const microservicesStatusObject: any[] = [];
    microserviceStatusDtos.forEach((value, key) => {
      const microserviceStatus = value as unknown;
      microserviceStatus['name'] = key;
      microservicesStatusObject.push(microserviceStatus);
    });
    return microservicesStatusObject;
  }
}
