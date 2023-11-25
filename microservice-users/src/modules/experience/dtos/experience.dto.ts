import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ExperienceDto {
  @ApiProperty({ example: 'Developer', description: 'Job' })
  @IsNotEmpty()
  readonly job: string;
  @ApiProperty({ example: '2021-01-01', description: 'Date of start' })
  @IsNotEmpty()
  readonly dateInit: Date;
  @ApiProperty({ example: '2021-01-01', description: 'Date of end' })
  readonly dateEnd: Date;
  @ApiProperty({ example: 'Google', description: 'Company' })
  @IsNotEmpty()
  readonly company: string;
  @ApiProperty({ example: 'I worked as a developer', description: 'Description' })
  @IsNotEmpty()
  readonly description: string;
}
