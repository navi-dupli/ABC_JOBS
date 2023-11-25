import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCandidateDto {
  @ApiProperty({ example: 'John', description: 'Nombres del usuario' })
  @IsNotEmpty()
  readonly names: string;

  @ApiProperty({ example: 'Doe', description: 'Apellidos del usuario' })
  @IsNotEmpty()
  readonly surnames: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Dirección de correo electrónico' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Password123', description: 'Contraseña del usuario' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 1, description: 'ID del tipo de identificación' })
  @IsNotEmpty()
  readonly typeIdentificationId: number;

  @ApiProperty({ example: 1, description: 'ID de la ciudad' })
  readonly cityId: number;

  @ApiProperty({ example: 1, description: 'ID de la región' })
  readonly regionId: number;

  @ApiProperty({ example: 1, description: 'ID del país' })
  readonly countryId: number;

  @ApiProperty({ example: 'A12345', description: 'Número de identificación' })
  readonly identification: string;

  @ApiProperty({ example: '000000', description: 'Número de teléfono' })
  readonly phone: string;

  @ApiProperty({ example: '2021-01-01', description: 'Fecha de nacimiento' })
  readonly dateBirthDate: Date;

  @ApiProperty({ example: '1', description: 'Dirección' })
  readonly address: string;
}
