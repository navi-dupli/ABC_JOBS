import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: Date;

  @IsNotEmpty()
  idCompany: number;
}
