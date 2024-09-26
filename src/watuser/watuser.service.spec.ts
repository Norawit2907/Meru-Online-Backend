import { Test, TestingModule } from '@nestjs/testing';
import { WatuserService } from './watuser.service';

describe('WatuserService', () => {
  let service: WatuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatuserService],
    }).compile();

    service = module.get<WatuserService>(WatuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
