import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceStatusLiteDto } from '../dtos/microservice-status-lite.dto';
import { dynamicRoutesConfig, RouteConfig } from '../../../../dynamic-routes.config';

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

  // for echas dynamicRoutesConfig, generate an objet similar to the one returnet by map method, but with the microservice name as key,
  public getMicroserviceStatusDataSet() {
    return dynamicRoutesConfig.map((route: RouteConfig) => {
      const microserviceStatusLite = this.microservicesStatus.get(route.path.toString());
      if (microserviceStatusLite) {
        return {
          name: route.path.toString(),
          ...microserviceStatusLite,
          healthy: microserviceStatusLite.index >= this.healthIndex,
          serverTime: new Date().getTime(),
        };
      } else {
        return {
          name: route.path.toString(),
          index: 0,
          healthy: false,
          lastCheck: new Date().getTime(),
          instances: [],
          instancesSize: 0,
          totalStatusRows: 0,
          serverTime: new Date().getTime(),
        } as MicroserviceStatusLiteDto;
      }
    });
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
