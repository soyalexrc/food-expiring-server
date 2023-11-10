import { Module } from '@nestjs/common';
import { PredeterminedProductService } from './predetermined-product.service';
import { PredeterminedProductController } from './predetermined-product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PredeterminedProduct,
  PredeterminedProductSchema,
} from './entities/predetermined-product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PredeterminedProduct.name, schema: PredeterminedProductSchema },
    ]),
  ],
  controllers: [PredeterminedProductController],
  providers: [PredeterminedProductService],
})
export class PredeterminedProductModule {}
