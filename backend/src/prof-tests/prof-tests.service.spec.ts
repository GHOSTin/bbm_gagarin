import { Test, TestingModule } from '@nestjs/testing';
import { ProfTestsService } from './prof-tests.service';

describe('ProfTestsService', () => {
  let service: ProfTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfTestsService],
    }).compile();

    service = module.get<ProfTestsService>(ProfTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
