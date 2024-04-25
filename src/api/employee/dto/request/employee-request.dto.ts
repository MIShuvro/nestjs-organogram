import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class DesignationRequestDto {
  @IsString()
  @ApiProperty()
  name: string;
}
