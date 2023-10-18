import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class AuthResponseDto {
  access_token: string;
  token_type: string;
}

@Injectable()
export class Auth0AuthenticationService {
  private logger = new Logger();
  private accessToken: string = '';

  constructor(private readonly httpService: HttpService) {}

  getAccessToken(): Observable<string> {
    if (this.accessToken && this.isValidToken(this.accessToken)) {
      return of(this.accessToken);
    } else {
      return this.authenticateAccessToken();
    }
  }

  /**
   * Authenticate users-app to Auth0 to get access token
   * @private
   */
  private authenticateAccessToken(): Observable<string> {
    const authCredentials = {
      client_id: process.env.AUTH0_MANAGER_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGER_CLIENT_SECRET,
      audience: process.env.AUTH0_MANAGER_AUDIENCE,
      grant_type: process.env.AUTH0_MANAGER_GRANT_TYPE,
    };

    return this.httpService.post(process.env.AUTH0_MANAGER_END_POINT, authCredentials).pipe(
      map((response: AxiosResponse<AuthResponseDto>) => {
        this.accessToken = response.data.access_token;
        return this.accessToken;
      }),
      catchError((error) => {
        this.logger.error(error);
        return of(null);
      }),
    );
  }

  /**
   * Validate token
   * @param token
   * @private
   */
  private isValidToken(token: string): boolean {
    try {
      const decodedToken = jwt.decode(token) as jwt.JwtPayload;

      if (!decodedToken || !decodedToken.exp) {
        return false;
      }
      const expirationTimestamp = decodedToken.exp * 1000; // Convert to milliseconds
      const currentTimestamp = Date.now();

      return currentTimestamp <= expirationTimestamp;
    } catch (error) {
      return false;
    }
  }
}
