import { Injectable, NotFoundException } from '@nestjs/common';
import { And, Between, In, MoreThan, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from '../../../education/entities/education.entity';
import { Experience } from '../../../experience/entities/experience.entity';
import { UserLanguage } from '../../../userLanguage/entities/userLanguage.entity';
import { UserAbility } from '../../../userAbility/entities/userAbility.entity';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(UserLanguage)
    private readonly userLanguageRepository: Repository<UserLanguage>,
    @InjectRepository(UserAbility)
    private readonly userAbilityRepository: Repository<UserAbility>,
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
      relations: ['skills', 'location', 'languages', 'education', 'experiences'],
      where: {
        id: In(usersMap),
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id, rol: 'CANDIDATO' },
      relations: ['skills', 'location', 'languages', 'education', 'experiences'],
    });
  }

  async addEducation(id: number, education: Education): Promise<Education> {
    const user: User = await this.userRepository.findOne({
      where: { id: id, rol: 'CANDIDATO' },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    education.user = user;
    return await this.educationRepository.save(education);
  }

  async addExperience(id: number, experience: Experience) {
    const user: User = await this.userRepository.findOne({
      where: { id: id, rol: 'CANDIDATO' },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    experience.user = user;
    return await this.experienceRepository.save(experience);
  }

  async addLanguage(id: number, language: UserLanguage[]) {
    const user: User = await this.userRepository.findOne({
      where: { id: id, rol: 'CANDIDATO' },
      relations: ['languages'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const languages = [];
    for (const userLanguage of language) {
      let languageExist = await this.userLanguageRepository.findOne({
        where: { name: userLanguage.name, user: user, code: userLanguage.code },
      });
      if (!languageExist) {
        userLanguage.user = user;
        languageExist = await this.userLanguageRepository.save(userLanguage);
      }
      languages.push(languageExist);
    }
    for (const language of user.languages) {
      if (!languages.find((l) => l.id === language.id)) {
        await this.userLanguageRepository.remove(language);
      }
    }
    return user;
  }

  async addSkills(id: number, skills: UserAbility[]) {
    const user: User = await this.userRepository.findOne({
      where: { id: id, rol: 'CANDIDATO' },
      relations: ['skills'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const skillsExist = [];
    for (const skill of skills) {
      let skillExist = await this.userAbilityRepository.findOne({
        where: { idAbility: skill.idAbility, user: user },
      });
      if (!skillExist) {
        skill.user = user;
        skillExist = await this.userAbilityRepository.save(skill);
      }
      skillsExist.push(skillExist);
    }
    for (const skill of user.skills) {
      if (!skillsExist.find((s) => s.id === skill.id)) {
        await this.userAbilityRepository.remove(skill);
      }
    }
    return user;
  }

  async updateExperienceYears(id: number, experienceYears) {
    const user: User = await this.userRepository.findOne({
      where: { id: id, rol: 'CANDIDATO' },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.experienceYears = experienceYears.experienceYears;
    return await this.userRepository.save(user);
  }
}
