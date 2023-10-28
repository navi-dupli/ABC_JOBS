import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty({ example: 401, description: 'Código de estado HTTP' })
  statusCode: any;

  @ApiProperty({ example: 'Unauthorized', description: 'Mensaje de error' })
  message: string;

  @ApiProperty({ example: '2023-11-01T12:34:56.789Z', description: 'Fecha y hora de la respuesta' })
  timestamp: string;

  @ApiProperty({ example: '/auth', description: 'Ruta de la solicitud' })
  path: string;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const exceptionDto: ExceptionDto = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    };

    response.status(status).json(exceptionDto);
  }
}
