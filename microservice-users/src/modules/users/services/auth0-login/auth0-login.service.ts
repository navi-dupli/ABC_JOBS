import { Injectable, Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Auth0RequestLoginDto, Auth0ResponseLoginDto, LoginDto } from '../../dto/login.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class Auth0LoginService {
  private logger = new Logger(Auth0LoginService.name);

  constructor(private readonly httpService: HttpService) {}

  authenticate(loginDto: LoginDto): Promise<Auth0ResponseLoginDto> {
    this.logger.debug(`authenticateAccessToken: ${loginDto.email}`);
    return this.httpService
      .post(process.env.AUTH0_AUTH_END_POINT, Auth0RequestLoginDto.fromLoginDto(loginDto))
      .pipe(
        map((response: AxiosResponse<Auth0ResponseLoginDto>) => {
          return response.data;
        }),
        catchError((error) => {
          this.logger.error(error);
          return of(null);
        }),
      )
      .toPromise();
  }
}
