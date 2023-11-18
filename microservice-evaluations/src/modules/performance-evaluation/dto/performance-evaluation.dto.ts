import { IsNotEmpty } from 'class-validator';

export class PerformanceEvaluationDto {
  @IsNotEmpty()
  performance: string;

  @IsNotEmpty()
  observations: string;

  @IsNotEmpty()
  project_id: number;

  @IsNotEmpty()
  team_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  qualifying_user_id: number;

  @IsNotEmpty()
  dimension_id: number;
}
