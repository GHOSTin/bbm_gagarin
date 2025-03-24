import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserEntity } from '@/users/entities/user.entity';
import { ProfileEntity } from '@/profiles/entities/profile.entity';

export class UpdateUserDto extends PartialType(UserEntity) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @ApiProperty()
  updatedAt: Date;

  @IsString()
  @ApiProperty()
  refreshToken?: string;

  @ApiProperty()
  profile: Partial<ProfileEntity>;
}
