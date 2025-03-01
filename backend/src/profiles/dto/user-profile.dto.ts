import { UserEntity } from '@/users/entities/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Role } from '@/roles/roles.enum';
import { Roles } from '@prisma/client';

export class profileUserDto extends PickType(UserEntity, ['id', 'role']) {
  @ApiProperty()
  id: number;

  @ApiProperty({enum: Role})
  role: Roles
}