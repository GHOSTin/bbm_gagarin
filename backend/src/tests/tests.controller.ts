import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { TestEntity } from '@/tests/entities/test.entity';

@Controller('tests')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @HttpCode(200)
  @ApiOkResponse({type: TestEntity})
  create(@Body() createTestDto: CreateTestDto) {
    return this.testsService.createTestResult({...createTestDto, isComplete: true});
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({type: TestEntity})
  findById(@Param ('id', ParseUUIDPipe) id: string) {
    return this.testsService.findTests({where: {id}})
  }

  @Get('/users/:id')
  @ApiOkResponse({type: Array<TestEntity>})
  findByUserId(@Param ('id', ParseIntPipe) userId: number) {
    return this.testsService.findTests({where: {userId}});
  }
}
