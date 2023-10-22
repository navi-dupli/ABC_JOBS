import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  projectName: string;

  @IsNotEmpty()
  projectDescription: string;

  @IsDateString()
  projectDate: Date;

  @IsNotEmpty()
  companyId: number;
}
