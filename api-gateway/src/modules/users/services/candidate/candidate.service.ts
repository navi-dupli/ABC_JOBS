import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { MicroserviceEnum } from '../../../../dynamic-routes.config';
import { MicroserviceClientService } from '../../../../commons/modules/microservice-manager/services/microservice-client.service';
import { CreateCandidateDto } from '../../dto/create-candidate.dto';
import {UserAbilityLanguageDto} from "../../dto/user-ability-language.dto";

@Injectable()
export class CandidateService {
  constructor(
    @Inject(MicroserviceEnum.USERS)
    private readonly usersRestClient: MicroserviceClientService,
    @Inject(MicroserviceEnum.COMMONS)
    private readonly commonsRestClient: MicroserviceClientService,
  ) {}

  async createCandidate(req: Request, candidateDto: CreateCandidateDto): Promise<any> {
    const country = await this.commonsRestClient.call(`/countries/${candidateDto.countryId}`, 'GET', req).toPromise();
    if (country) {
      const region = await this.commonsRestClient.call(`/regions/${candidateDto.regionId}`, 'GET', req).toPromise();
      if (region) {
        const city = await this.commonsRestClient.call(`/cities/${candidateDto.cityId}`, 'GET', req).toPromise();
        if (city) {
          const identificationType = await this.commonsRestClient
            .call(`/identification/${candidateDto.typeIdentificationId}`, 'GET', req)
            .toPromise();
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
              },
            };
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

  async addLanguageAndSkill(req: Request, id: number, userAbilityLanguageDto: UserAbilityLanguageDto) {
    const userLanguage = [];
    for (let i = 0; i < userAbilityLanguageDto.languages.length; i++) {
      const language = await this.commonsRestClient.call(`/languages/${userAbilityLanguageDto.languages[i]}`, 'GET', req).toPromise();
      if (language && language.code && language.name) {
        userLanguage.push({
          name: language.name,
          code: language.code,
        });
      }
    }
    await this.usersRestClient.call(`/candidate/${id}/language`, 'POST', req, userLanguage).toPromise();
    const userSkill = [];
    for (let i = 0; i < userAbilityLanguageDto.abilities.length; i++) {
      const skill = await this.commonsRestClient.call(`/skills/${userAbilityLanguageDto.abilities[i]}`, 'GET', req).toPromise();
      if (skill && skill.id && skill.name) {
        userSkill.push({
          idAbility: skill.id,
          name: skill.name,
        });
      }
    }
    await this.usersRestClient.call(`/candidate/${id}/skills`, 'POST', req, userSkill).toPromise();

    await this.usersRestClient
      .call(`/candidate/${id}/experience-years`, 'POST', req, { experienceYears: userAbilityLanguageDto.experienceYears })
      .toPromise();

    return await this.usersRestClient.call(`/candidate/${id}`, 'GET', req).toPromise();
  }
}
