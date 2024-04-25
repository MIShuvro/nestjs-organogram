import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class DesignationResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  identifier: string;
}
