import { IsNotEmpty } from 'class-validator';

export class AddMemberTeamDto {
  @IsNotEmpty()
  userId: number[];

  @IsNotEmpty()
  teamId: number;
}
