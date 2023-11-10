import { Test, TestingModule } from '@nestjs/testing';
import { PredeterminedProductService } from './predetermined-product.service';

describe('PredeterminedProductService', () => {
  let service: PredeterminedProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredeterminedProductService],
    }).compile();

    service = module.get<PredeterminedProductService>(PredeterminedProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
