import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Checklist } from '@/checklists/entities/checklist.entity';

@Injectable()
export class ChecklistsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createChecklistDto: CreateChecklistDto) {
    return this.prisma.checkList.create({data: {...createChecklistDto}});
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CheckListWhereUniqueInput;
    where?: Prisma.CheckListWhereInput;
    orderBy?: Prisma.CheckListOrderByWithRelationInput;
  }) {
    return this.prisma.checkList.findMany({...params, include: {profTest: true}})
  }

  findOne(where: Prisma.CheckListWhereUniqueInput) {
    return this.prisma.checkList.findUnique({
      where,
      include: {
        profTest: true
      }
    });
  }

  findMany(where: Prisma.CheckListWhereInput){
    return this.prisma.checkList.findMany({
      where,
      include: {
        profTest: true
      }
    })
  }

  update(id: number, updateChecklistDto: UpdateChecklistDto) {
    return `This action updates a #${id} checklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklist`;
  }
}
