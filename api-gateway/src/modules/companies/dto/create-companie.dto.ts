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
  representativePassword: string;

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

export class CompanyCreatedDto {
  id: number;
  companyName: string;
  uniqueIdentification: string;
  /* businessActivity: string;
   companyEmail: string;
   representativeName: string;
   representativeEmail: string;
   representativePassword: string;
   phoneNumber: string;
   country: number;
   region: number;
   city: number;
   address: string;*/
}

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
  @IsNotEmpty()
  readonly company_id: number;
  @IsNotEmpty()
  readonly identification: string;
}
