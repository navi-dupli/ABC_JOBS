import { Logger, Module } from '@nestjs/common';
import { Auth0AuthenticationService } from './services/auth0-authentication.service';
import { HttpModule } from '@nestjs/axios';
import { Auth0ExternalApiService } from './services/auth0-external-api.service';

@Module({
  imports: [HttpModule],
  providers: [Auth0AuthenticationService, Auth0ExternalApiService, Logger],
  exports: [Auth0ExternalApiService],
})
export class UserManagerModule {}
