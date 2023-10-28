import { Injectable } from '@nestjs/common';
import { Repository, In, Between, MoreThan, And } from 'typeorm';
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
    languages: string[],
    countries: number[],
    education: string[],
    experienceYears: string[],
  ): Promise<User[]> {
    const query = {
      select: {
        id: true,
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
        name: In(languages),
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
      const range = experienceYears.map((experienceYears) => {
        const range = experienceYears.split('-');
        if (range.length === 1) {
          return MoreThan(range[0]);
        } else {
          return Between(range[0], range[1]);
        }
      });
      query.where['experienceYears'] = And(...range);
    }

    const users = await this.userRepository.find(query);

    const usersMap = users.map((user) => user.id);

    return this.userRepository.find({
      relations: {
        skills: true,
        location: true,
        languages: true,
        education: true,
        experiences: true,
      },
      where: {
        id: In(usersMap),
      },
    });
  }
}
