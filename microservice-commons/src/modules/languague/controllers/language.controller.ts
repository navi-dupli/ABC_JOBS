import {Controller, Get, Param} from '@nestjs/common';
import {AuthorizedController} from "../../../commons/controllers/authorized/authorized.controller";
import {LanguageService} from "../services/language.service";
import {Language} from "../entities/language.entity";

@Controller('languages')
export class LanguageController extends AuthorizedController{
  constructor(private readonly languageService: LanguageService) {
    super();
  }

  @Get()
  findAll(): Promise<Language[]> {
    return this.languageService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string): Promise<Language> {
    return this.languageService.findOne(code);
  }
}
