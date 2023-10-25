import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  name: string;
}
