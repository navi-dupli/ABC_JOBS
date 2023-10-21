import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async search(
    skills: number[],
    languages: number[],
    countries: number[],
    education: string[],
    experienceYears: string[],
  ): Promise<User[]> {
    const query = {
      relations: {
        skills: true,
        location: true,
        languages: true,
      },
      where: {
        rol: 'CANDIDATO',
      },
    };
    if (skills.length > 0) {
      query.where['skills'] = {
        id: In(skills),
      };
    }

    if (languages.length > 0) {
      query.where['languages'] = {
        id: In(languages),
      };
    }

    if (countries.length > 0) {
      query.where['location'] = {
        idCountry: In(countries),
      };
    }

    if (education.length > 0) {
      query.where['education'] = {
        type: In(education),
      };
    }

    if (experienceYears.length > 0) {
      query.where['experienceYears'] = In(experienceYears);
    }

    return this.userRepository.find(query);
  }
}
