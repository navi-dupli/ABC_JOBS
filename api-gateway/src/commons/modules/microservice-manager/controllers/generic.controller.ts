import { All, Body, Controller, Logger, NotFoundException, Param, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { dynamicRoutesConfig, RouteConfig } from '../../../../dynamic-routes.config';
import { GenericRequestDelegatedService } from '../services/generic-request-delegated.service';
import { AuthorizedController } from '../../../controllers/authorized/authorized.controller';
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
    @Param('path') path: string,
    @Body() body: any,
    @Query() query: Record<string, any>,
  ): Promise<any> {
    const routeConfig: RouteConfig | undefined = dynamicRoutesConfig.find((route) => route.path === path);
    if (routeConfig) {
      return this.requestDelegatedService.delegateRequest(routeConfig, req).toPromise();
    } else {
      this.logger.error(`Microservices with path: ${path} not found`);
      throw new NotFoundException(`Microservices with path: ${path} not found`);
    }
  }
}
