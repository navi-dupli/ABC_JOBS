import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: any) {
    const { method, originalUrl, params, headers } = req;
    const logMessage = `[${headers['x-request-id']}] Request ${method}:${originalUrl}?${JSON.stringify(params)}`;
    this.logger.log(logMessage);
    res.on('finish', () => {
      const logMessage = `[${headers['x-request-id']}] Response ${method}:${originalUrl}?${JSON.stringify(params)} => ${
        res.statusCode
      }`;
      if (res.statusCode >= 500) {
        this.logger.error(logMessage);
      }
      if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.warn(logMessage);
      }
      if (res.statusCode >= 300 && res.statusCode < 400) {
        this.logger.debug(logMessage);
      }
      if (res.statusCode >= 200 && res.statusCode < 300) {
        this.logger.verbose(logMessage);
      }
    });
    next();
  }
}
