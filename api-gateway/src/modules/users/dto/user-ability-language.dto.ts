import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAbilityLanguageDto {
  @ApiProperty({ example: [1], description: 'Ubicación del usuario' })
  @IsNotEmpty()
  readonly abilities: number[];

  @ApiProperty({ example: ['ES'], description: 'Ubicación del usuario' })
  @IsNotEmpty()
  readonly languages: string[];

  @ApiProperty({ example: 1, description: 'Total años experiencia' })
  @IsNotEmpty()
  readonly experienceYears: number;
}
