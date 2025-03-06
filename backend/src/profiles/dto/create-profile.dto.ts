import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsNumber()
  userId: number

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  classNumber?: number;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty()
  @IsBoolean()
  acceptTerms: false

  @ApiProperty({required: false})
  @IsString()
  phone?: string
}
