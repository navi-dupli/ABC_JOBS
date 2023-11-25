import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserAbilityDto {
  @ApiProperty({ example: 1, description: 'ID de la habilidad' })
  @IsNotEmpty()
  readonly idAbility: number;

  @ApiProperty({ example: 'React', description: 'Nombre de la habilidad' })
  @IsNotEmpty()
  readonly name: string;
}
