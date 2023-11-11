import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  name: string;
}
