import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { concatObject } from '../../../../common/utils';
import { DESIGNATION_IDENTIFIER } from '../../../../common/constants';


export class DesignationRequestDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty({ default: concatObject(DESIGNATION_IDENTIFIER, ' | ') })
  @IsNotEmpty()
  @IsIn(Object.values(DESIGNATION_IDENTIFIER))
  identifier: string;
}
