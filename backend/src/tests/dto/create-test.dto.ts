import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/client';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTestDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  result: Exclude<JsonValue, null>;

  @ApiProperty({ required: false })
  @IsBoolean()
  isComplete: boolean;
}
