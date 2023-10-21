import { Injectable } from '@nestjs/common';
import {Language} from "../entities/language.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class LanguageService {

  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {
  }

  async findAll(): Promise<Language[]> {
    return await this.languageRepository.find();
  }

}
