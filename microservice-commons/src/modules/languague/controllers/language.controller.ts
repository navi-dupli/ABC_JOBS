import {Controller, Get} from '@nestjs/common';
import {AuthorizedController} from "../../../commons/controllers/authorized/authorized.controller";
import {LanguageService} from "../services/language.service";
import {Language} from "../entities/language.entity";

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {

  }

  @Get()
  findAll(): Promise<Language[]> {
    return this.languageService.findAll();
  }
}
