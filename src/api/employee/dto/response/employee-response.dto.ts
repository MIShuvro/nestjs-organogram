import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform } from 'class-transformer';


export class EmployeeResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  @Transform(value => value.obj['designation']['id'])
  positionId: number;

  @ApiProperty()
  @Expose()
  @Transform(value => value.obj['designation']['name'])
  positionName: string;


  @ApiProperty({ type: [EmployeeResponseDto] })
  @Expose()
  @Transform((value) =>
    plainToClass(EmployeeResponseDto, value.obj.children ?? null, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true
    })
  )
  child: EmployeeResponseDto[];
}

export class EmployeeResponseWithChildDto extends EmployeeResponseDto {
  @ApiProperty({ type: [EmployeeResponseDto] })
  @Expose()
  @Transform((value) =>
    plainToClass(EmployeeResponseDto, value.obj.children ?? null, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true
    })
  )
  child: EmployeeResponseDto[];
}
