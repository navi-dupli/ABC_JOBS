// generic.controller.ts

import { All, Controller, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { dynamicRoutesConfig, RouteConfig } from '../../../dynamic-routes.config';
import { HttpService } from '@nestjs/axios';
import { catchError, throwError } from 'rxjs';

@Controller()
export class GenericController {
  private readonly logger = new Logger(GenericController.name);

  constructor(private readonly httpService: HttpService) {}

  @All(':path/**')
  handleAll(@Req() req: Request, @Res() res: Response): void {
    const path = req.params.path as string;
    const routeConfig: RouteConfig | undefined = dynamicRoutesConfig.find((route) => route.path === path);

    if (routeConfig) {
      // Realiza la llamada al microservicio internamente
      this.httpService
        .get(`${routeConfig.endPoint}${req.url}`, {
          headers: req.headers,
        })
        .pipe(
          catchError((error) => {
            // Manejo de errores, si es necesario
            return throwError(error);
          }),
        )
        .subscribe((response) => {
          // Devuelve la respuesta al cliente
          res.status(response.status).json(response.data);
        });
    } else {
      // Manejo de rutas no configuradas
      res.status(404).json({ error: 'Route not found' });
    }
  }
}
