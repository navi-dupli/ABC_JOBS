import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ExternalApiResponseDto } from '../dto/external-api.dto';
import { Auth0UserDto, RequestUserDto } from '../dto/auth-user.dto';
import { Auth0AuthenticationService } from './auth0-authentication.service';
import { AuthRole } from '../enums/role.enum';
import { UserAlreadyExistException } from '../../../exceptions/user-already-exist.exception';

@Injectable()
export class Auth0ExternalApiService {
  private logger = new Logger();

  constructor(
    private readonly httpService: HttpService,
    private readonly authenticationService: Auth0AuthenticationService,
  ) {}

  async createUser(userDto: Auth0UserDto): Promise<ExternalApiResponseDto> {
    try {
      const accessToken = await this.authenticationService.getAccessToken().toPromise();

      // Use the obtained access token in the HTTP request
      const config: AxiosRequestConfig = this.buildRequestConfig(accessToken);
      const response: AxiosResponse<ExternalApiResponseDto> = await this.httpService
        .post(`${process.env.AUTH0_MANAGER_AUDIENCE}users`, RequestUserDto.fromCreateUserDto(userDto), config)
        .toPromise();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === 409) {
        this.logger.error(error.response.data.message);
        throw new UserAlreadyExistException(error.response.data.message);
      }
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async assignRole(userId: string, role: AuthRole): Promise<ExternalApiResponseDto> {
    try {
      const accessToken = await this.authenticationService.getAccessToken().toPromise();
      const config = this.buildRequestConfig(accessToken);
      const response: AxiosResponse<ExternalApiResponseDto> = await this.httpService
        .post(`${process.env.AUTH0_MANAGER_AUDIENCE}roles/${role.auth0Id}/users`, { users: [userId] }, config)
        .toPromise();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === 409) {
        this.logger.error(error.response.data.message);
        throw new NotFoundException(error.response.data.message);
      }
      this.logger.error(error);
      throw new NotFoundException(error);
    }
  }

  private buildRequestConfig(accessToken: string) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return config;
  }
}
