import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: any) {
    const { method, url, baseUrl, params, headers } = req;
    const logMessage = `[${headers['x-request-id']}] ${method}:${url}${baseUrl}?${JSON.stringify(params)}`;
    this.logger.log(logMessage);
    next();
  }
}
