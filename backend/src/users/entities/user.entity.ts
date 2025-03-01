import { ApiProperty } from '@nestjs/swagger';
import { Roles, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

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
}