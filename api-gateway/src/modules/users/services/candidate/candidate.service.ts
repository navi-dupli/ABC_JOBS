import {HttpException, Inject, Injectable} from '@nestjs/common';
import { Request } from 'express';
import {MicroserviceEnum} from "../../../../dynamic-routes.config";
import {MicroserviceClientService} from "../../../../commons/modules/microservice-manager/services/microservice-client.service";
import {CreateCandidateDto} from "../../dto/create-candidate.dto";

@Injectable()
export class CandidateService {
  constructor(
    @Inject(MicroserviceEnum.USERS)
    private readonly usersRestClient: MicroserviceClientService,
    @Inject(MicroserviceEnum.COMMONS)
    private readonly commonsRestClient: MicroserviceClientService,
  ) {
  }

  async createCandidate(req: Request, candidateDto: CreateCandidateDto): Promise<any> {
    const country = await this.commonsRestClient.call(`/countries/${candidateDto.countryId}`, 'GET', req).toPromise();
    if (country) {
      const region = await this.commonsRestClient.call(`/regions/${candidateDto.regionId}`, 'GET', req).toPromise();
      if (region) {
        const city = await this.commonsRestClient.call(`/cities/${candidateDto.cityId}`, 'GET', req).toPromise();
        if (city) {
          const identificationType = await this.commonsRestClient.call(`/identification/${candidateDto.typeIdentificationId}`, 'GET', req).toPromise();
          if (identificationType) {
            const candidate = {
              ...candidateDto,
              locationId: {
                idCity: city.id,
                idRegion: region.id,
                idCountry: country.id,
                nameCity: city.name,
                nameRegion: region.name,
                nameCountry: country.name,
              }
            }
            const user = await this.registerCandidate(req, candidate);
            if (user) {
              return user;
            } else {
              throw new HttpException('Error creating user', 500);
            }
          } else {
            throw new HttpException('Identification type not found', 404);
          }
        } else {
          throw new HttpException('City not found', 404);
        }
      } else {
        throw new HttpException('Region not found', 404);
      }
    } else {
      throw new HttpException('Country not found', 404);
    }
  }

  private async registerCandidate(req: Request, candidateDto: any) {
    candidateDto['rol'] = 'CANDIDATO';
    try {
      return await this.usersRestClient.call('/users', 'POST', req, candidateDto).toPromise();
    } catch (error) {
      return null;
    }
  }
}
