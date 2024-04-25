import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class AuthPayloadResponseDto {
  @ApiProperty()
  @Expose()
  token: string;
}
