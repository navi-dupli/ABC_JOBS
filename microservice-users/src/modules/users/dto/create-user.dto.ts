import { UserLocation } from '../../userLocation/entities/userLocation.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

  @ApiProperty({ example: 'user', description: 'Rol del usuario' })
  @IsNotEmpty()
  readonly rol: string;

  @ApiProperty({ example: '12345', description: 'ID de la empresa a la que pertenece el usuario' })
  readonly company_id: string;

  @ApiProperty({ example: 1, description: 'ID del tipo de identificación' })
  @IsNotEmpty()
  readonly typeIdentificationId: number;

  @ApiProperty({ example: 1, description: 'Nombre del tipo de identificación' })
  @IsNotEmpty()
  readonly nameIdentification: string;

  @ApiProperty({ type: () => UserLocation, description: 'Ubicación del usuario' })
  readonly locationId: UserLocation;

  @ApiProperty({ example: 'A12345', description: 'Número de identificación' })
  readonly identification: string;

  @ApiProperty({ example: '000000', description: 'Número de teléfono' })
  readonly phone: string;

  @ApiProperty({ example: '2021-01-01', description: 'Fecha de nacimiento' })
  readonly dateBirthDate: Date;

  @ApiProperty({ example: '1', description: 'Dirección' })
  readonly address: string;
}
