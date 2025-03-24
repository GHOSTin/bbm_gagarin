import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateProfTestDto {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsBoolean()
  active?: boolean
}
