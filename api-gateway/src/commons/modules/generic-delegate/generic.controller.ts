import { All, Body, Controller, Logger, Param, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { dynamicRoutesConfig, RouteConfig } from '../../../dynamic-routes.config';
import { GenericRequestDelegatedService } from './generic-request-delegated.service';
import { AuthorizedController } from '../../controllers/authorized/authorized.controller';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Generic-Delegated')
export class GenericController extends AuthorizedController {
  private readonly logger = new Logger(GenericController.name);

  constructor(private readonly requestDelegatedService: GenericRequestDelegatedService) {
    super();
  }

  @All(':path*')
  handleAll(
    @Req() req: Request,
    @Res() res: Response,
    @Param('path') path: string,
    @Body() body: any,
    @Query() query: Record<string, any>,
  ): void {
    const routeConfig: RouteConfig | undefined = dynamicRoutesConfig.find((route) => route.path === path);

    if (routeConfig) {
      const { method, url } = this.constructUrlAndMethod(routeConfig, req);

      this.requestDelegatedService.delegateRequest(method, url, req.headers, body).subscribe((response) => {
        res.status(response.status).json(response.data);
      });
    } else {
      this.logger.error(`Route not found: ${path}`);
      res.status(404).json({ error: 'Route not found' });
    }
  }

  private constructUrlAndMethod(routeConfig: RouteConfig, req: Request): { method: string; url: string } {
    const method = req.method.toUpperCase();
    const url = `${routeConfig.endPoint}${req.url}`;
    return { method, url };
  }
}
