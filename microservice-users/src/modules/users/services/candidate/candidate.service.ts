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

  async search(skills: number[]): Promise<User[]> {
    const query = {
      relations: {
        skills: true,
      },
      where: {},
    };
    if (skills.length > 0) {
      query.where = {
        ...query.where,
        skills: {
          id: In(skills),
        },
      };
    }
    return this.userRepository.find(query);
  }
}
