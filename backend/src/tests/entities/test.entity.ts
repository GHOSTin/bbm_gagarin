import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsJSON, IsNumber, IsString, IsUUID } from 'class-validator';
import { JsonValue } from '@prisma/client/runtime/client';

export class TestEntity {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  type: 'epi' | 'holland';

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty()
  @IsJSON()
  result: Exclude<JsonValue, null>;
}
