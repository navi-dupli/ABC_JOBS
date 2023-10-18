// dynamic-routes.config.ts

import * as process from 'process';

export interface RouteConfig {
  path: string;
  microservice: string;
  endPoint: string;
}

export const dynamicRoutesConfig: RouteConfig[] = [
  {
    path: 'commons-app',
    microservice: 'commons-micro-service',
    endPoint: process.env.COMMONS_ENDPOINT || 'http://localhost:3000',
  },
  {
    path: 'companies-app',
    microservice: 'companies-micro-service',
    endPoint: process.env.COMPANIES_ENDPOINT || 'http://localhost:3001',
  },
  {
    path: 'controllers-app',
    microservice: 'controllers-micro-service',
    endPoint: process.env.USERS_ENDPOINT || 'http://localhost:3002',
  },
];
