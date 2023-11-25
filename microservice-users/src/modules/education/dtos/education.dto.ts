import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EducationDto {
  @ApiProperty({ example: 'PhD', description: '' })
  @IsNotEmpty()
  readonly type: string;
  @ApiProperty({ example: 'Computer Science', description: 'obtained title' })
  @IsNotEmpty()
  readonly title: string;
  @ApiProperty({ example: 'University of California', description: 'Institution' })
  @IsNotEmpty()
  readonly institution: string;
  @ApiProperty({ example: '2021-01-01', description: 'Date of start' })
  @IsNotEmpty()
  dateInit: Date;
  @ApiProperty({ example: '2021-01-01', description: 'Date of end' })
  readonly dateEnd: Date;
}
