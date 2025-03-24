import { Injectable } from '@nestjs/common';
import { Prisma, ProfTest } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProfTestsService {

  constructor(private readonly prisma: PrismaService) {}

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProfTestWhereUniqueInput;
    where?: Prisma.ProfTestWhereInput;
    orderBy?: Prisma.ProfTestOrderByWithRelationInput;
  }): Promise<ProfTest[]> {
    return this.prisma.profTest.findMany(params);
  }

  findOne(profTestsWhereUniqueInput: Prisma.ProfTestWhereUniqueInput): Promise<ProfTest | null> {
    return this.prisma.profTest.findUnique({where: profTestsWhereUniqueInput});
  }

  update(params: {where: Prisma.ProfTestWhereUniqueInput, data: Prisma.ProfTestUpdateInput}): Promise<ProfTest> {
    const {where, data} = params
    return this.prisma.profTest.update({data, where})
  }

  updateMany(params: {
    data: {id: number}[],
    where: string[]
  }) {
    const {where, data} = params;
    return Promise.all(where.map((profTest)=>this.prisma.profTest.update({
      where: {id: profTest},
      data: {
        users: {
          connect: data
        }
      }
    })))
  }

}
