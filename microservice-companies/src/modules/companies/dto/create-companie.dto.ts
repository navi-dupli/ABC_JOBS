import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  uniqueIdentification: string;

  @IsNotEmpty()
  businessActivity: string;

  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @IsNotEmpty()
  representativeName: string;

  @IsEmail()
  @IsNotEmpty()
  representativeEmail: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  country: number;

  @IsNotEmpty()
  region: number;

  @IsNotEmpty()
  city: number;

  @IsNotEmpty()
  address: string;
}
