import { IsNotEmpty } from 'class-validator';

export class RegisterTechnicalTestDto {

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  observations: string;

  @IsNotEmpty()
  qualify: number;

  @IsNotEmpty()
  qualifying_user_id: number;

  @IsNotEmpty()
  test_id: number;

}
