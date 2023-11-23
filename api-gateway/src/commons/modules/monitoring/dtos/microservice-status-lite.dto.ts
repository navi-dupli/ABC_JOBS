export class MicroserviceStatusLiteDto {
  totalStatusRows: number;
  index: number;
  lastCheck: number;
  instancesSize: number;
  instances: Set<string>;
}
