import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfTestUsersDto {
  @ApiProperty()
  usersId: number[]

  @ApiProperty()
  profTestsId: string[]
}