import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateTestDto {
  @ApiProperty()
  @IsNumber()
  testId: 1 | 2 | 3 | 4

  @ApiProperty()
  userId: number

  @ApiProperty()
  results: string

  @ApiProperty({required: false})
  @IsBoolean()
  isComplete: boolean
}
