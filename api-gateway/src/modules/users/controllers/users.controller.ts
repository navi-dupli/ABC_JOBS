import { Controller, Get, Param, Req } from '@nestjs/common';
import { MicroserviceClientService } from '../../../commons/modules/generic-delegate/microservice-client.service';
import { MicroserviceEnum } from '../../../dynamic-routes.config';
import { forkJoin, map, Observable } from 'rxjs';
import { AuthorizedController } from '../../../commons/controllers/authorized/authorized.controller';
import { Request } from 'express';

@Controller('agregation/users')
export class UsersController extends AuthorizedController {
  constructor(private readonly microserviceClientService: MicroserviceClientService) {
    super();
  }

  @Get(':id')
  findAll(@Req() req: Request, @Param('id') id: number): Observable<any> {
    // Aquí se hace la llamada a los microservicios
    //TODO; poasar esto a un servicio
    const getUserById$ = this.microserviceClientService.call(MicroserviceEnum.USERS, `/users/${id}`, 'GET', req);
    const getUsers$ = this.microserviceClientService.call(MicroserviceEnum.USERS, '/users', 'GET', req);

    return forkJoin([getUsers$, getUserById$]).pipe(
      map(([users, userUno]) => {
        return {
          user: userUno,
          users: users,
        };
      }),
    );
  }
}
