export interface RouteConfig {
  path: MicroserviceEnum;
  microservice: string;
  endPoint: string;
}

export class MicroserviceEnum {
  static readonly COMMONS = 'commons-app';
  static readonly COMPANIES = 'companies-app';
  static readonly USERS = 'users-app';
}

export const dynamicRoutesConfig: RouteConfig[] = [
  {
    path: MicroserviceEnum.COMMONS,
    microservice: 'commons-micro-service',
    endPoint: process.env.COMMONS_ENDPOINT || 'http://localhost:3000',
  },
  {
    path: MicroserviceEnum.COMPANIES,
    microservice: 'companies-micro-service',
    endPoint: process.env.COMPANIES_ENDPOINT || 'http://localhost:3001',
  },
  {
    path: MicroserviceEnum.USERS,
    microservice: 'users-micro-service',
    endPoint: process.env.USERS_ENDPOINT || 'http://localhost:3002',
  },
];
