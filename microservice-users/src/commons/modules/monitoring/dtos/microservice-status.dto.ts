export class MicroserviceStatusDto {
  public microservice: string;
  public instanceId: string;
  public healthy: boolean;
  public timestamp: string;
  public healthInfo: any;
  public time: number;
}
