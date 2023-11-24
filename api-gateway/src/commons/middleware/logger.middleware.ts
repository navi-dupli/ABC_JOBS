import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: any) {
    const startTime = new Date();
    req.headers['x-request-id'] = `abcjobs:${uuidv4()}`;
    const { method, originalUrl, params, headers } = req;
    const logMessage = `[${headers['x-request-id']}] Request ${method}:${originalUrl}?${JSON.stringify(params)}`;
    this.logger.log(logMessage);
    res.on('finish', () => {
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      const logMessage = `[${headers['x-request-id']}] Response ${method}:${originalUrl}?${JSON.stringify(params)} => ${
        res.statusCode
      } (Elapsed Time: ${elapsedTime}ms)`;

      res.setHeader('x-request-id', headers['x-request-id']);
      res.set('x-timestamp', `${new Date().getTime()}`);
      if (res.statusCode >= 500) {
        this.logger.error(logMessage);
      }
      if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.warn(logMessage);
      }
      if (res.statusCode >= 300 && res.statusCode < 400) {
        this.logger.warn(logMessage);
      }
      if (res.statusCode >= 200 && res.statusCode < 300) {
        this.logger.verbose(logMessage);
      }
    });
    next();
  }
}
