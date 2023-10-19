import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: any) {
    const { method, url, baseUrl, params } = req;
    const logMessage = `${method}:${url}${baseUrl}?${JSON.stringify(params)}`;
    this.logger.log(logMessage);
    req.headers['x-request-id'] = 'abcjobs:1234567890';
    next();
  }
}
