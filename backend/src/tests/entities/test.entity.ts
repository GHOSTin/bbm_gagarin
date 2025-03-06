import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class TestEntity {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({type: Number})
  @IsNumber()
  testId: 1|2|3|4;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({required: false})
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty()
  @IsString()
  results: string;

}
