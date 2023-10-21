import { Module } from '@nestjs/common';
import { LanguageController } from './controllers/language.controller';
import { LanguageService } from './services/language.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Language} from "./entities/language.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageService]
})
export class LanguageModule {}
