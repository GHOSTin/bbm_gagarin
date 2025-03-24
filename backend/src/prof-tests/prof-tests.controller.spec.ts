import { Test, TestingModule } from '@nestjs/testing';
import { ProfTestsController } from './prof-tests.controller';
import { ProfTestsService } from './prof-tests.service';

describe('ProfTestsController', () => {
  let controller: ProfTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfTestsController],
      providers: [ProfTestsService],
    }).compile();

    controller = module.get<ProfTestsController>(ProfTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
