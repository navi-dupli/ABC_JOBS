import { UserLocation } from '../../userLocation/entities/userLocation.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly names: string;
  @IsNotEmpty()
  readonly surnames: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly rol: string;
  readonly company_id: string;
  @IsNotEmpty()
  readonly typeIdentificationId: number;
  readonly nameIdentification: string;
  readonly locationId: UserLocation;
  readonly identification: string;
}
