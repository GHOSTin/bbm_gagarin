import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  userId: number | null;

  @ApiProperty({ nullable: true })
  groupId: string | null;

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty({ required: false })
  middleName?: string

  @ApiProperty({ required: false })
  birthday: Date

  @ApiProperty()
  acceptTerms: boolean

  @ApiProperty()
  phone?: string
}
