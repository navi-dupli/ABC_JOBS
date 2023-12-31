import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { MicroserviceClientService } from '../../../../commons/modules/microservice-manager/services/microservice-client.service';
import { Request } from 'express';
import { MicroserviceEnum } from '../../../../dynamic-routes.config';

@Controller('login')
export class LoginController {
  constructor(
    @Inject(MicroserviceEnum.USERS)
    private readonly microserviceClient: MicroserviceClientService,
  ) {}

  @Post()
  async login(@Body() loginDto: any, @Req() req: Request) {
    return this.microserviceClient.call('/login', 'POST', req, loginDto).toPromise();
  }
}
