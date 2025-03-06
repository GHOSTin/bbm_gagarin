import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Roles, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from '@/profiles/entities/profile.entity';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity> | null) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({required: false})
  name: string | null;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string | null;

  @Exclude()
  refreshToken: string | null;

  @ApiProperty({enum: Roles})
  role: Roles

  @ApiProperty({nullable: true, type: PartialType(ProfileEntity)})
  profile: Partial<ProfileEntity> | null
}