import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('checklists')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Post()
  create(@Request() req, @Body() createChecklistDto: CreateChecklistDto) {
    return this.checklistsService.create({
      ...createChecklistDto,
      userId: req.user?.['id'],
    });
  }

  @Get()
  findAll() {
    return this.checklistsService.findAll({});
  }

  @Get('user/:id')
  findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.checklistsService.findMany({userId: id});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checklistsService.findOne({id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecklistDto: UpdateChecklistDto) {
    return this.checklistsService.update(+id, updateChecklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistsService.remove(+id);
  }
}
