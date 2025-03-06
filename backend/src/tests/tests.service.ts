import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTestDto } from '@/tests/dto/create-test.dto';

@Injectable()
export class TestsService {
  constructor(private readonly prisma: PrismaService) {  }

  createTestResult(createTestDto: CreateTestDto) {
    return this.prisma.usersTest.create({data: {...createTestDto}})
  }

  findTests(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersTestWhereUniqueInput;
    where?: Prisma.UsersTestWhereInput;
    orderBy?: Prisma.UsersTestOrderByWithRelationInput;
  }) {
    return this.prisma.usersTest.findMany(params);
  }
}
