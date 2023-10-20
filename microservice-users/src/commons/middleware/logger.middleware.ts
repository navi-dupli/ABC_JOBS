import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: any) {
    const { method, originalUrl, params, headers } = req;
    const logMessage = `[${headers['x-request-id']}] ==> ${method}:${originalUrl}?${JSON.stringify(params)}`;
    this.logger.log(logMessage);
    res.on('finish', () => {
      const logMessage = `[${headers['x-request-id']}] <== ${res.statusCode} ${method}:${originalUrl}?${JSON.stringify(
        params,
      )}`;
      this.logger.log(logMessage);
    });
    next();
  }
}
