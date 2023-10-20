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
      this.requestDelegatedService.delegateRequest(routeConfig, req).subscribe((response) => {
        res.status(response?.status).json(response.data);
      });
    } else {
      this.logger.error(`Route not found: ${path}`);
      res.status(404).json({ error: `Microservices with path: ${path} not found` });
    }
  }
}
