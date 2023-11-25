import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LanguageDto {
  @ApiProperty({ example: 'English', description: 'Nombre del idioma' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'en', description: 'Código del idioma' })
  @IsNotEmpty()
  readonly code: string;
}
