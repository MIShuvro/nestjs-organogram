import { IsIn, IsNotEmpty, IsNotIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DESIGNATION_IDENTIFIER } from '../../../../common/constants';


export class EmployeeRequestDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  designation_id: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  parent_employee_id: number;

}
