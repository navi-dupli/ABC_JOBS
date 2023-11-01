import { IsNotEmpty } from 'class-validator';

export class AddMemberTeamDto {
  @IsNotEmpty()
  users: any [];

  @IsNotEmpty()
  teamId: number;
}
