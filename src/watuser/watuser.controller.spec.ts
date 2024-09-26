import { Test, TestingModule } from '@nestjs/testing';
import { WatuserController } from './watuser.controller';

describe('WatuserController', () => {
  let controller: WatuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatuserController],
    }).compile();

    controller = module.get<WatuserController>(WatuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
