import { Test, TestingModule } from '@nestjs/testing';
import { PredeterminedProductController } from './predetermined-product.controller';
import { PredeterminedProductService } from './predetermined-product.service';

describe('PredeterminedProductController', () => {
  let controller: PredeterminedProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredeterminedProductController],
      providers: [PredeterminedProductService],
    }).compile();

    controller = module.get<PredeterminedProductController>(PredeterminedProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
