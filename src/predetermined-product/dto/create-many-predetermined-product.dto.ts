import { CreatePredeterminedProductDto } from './create-predetermined-product.dto';
import { IsArray } from 'class-validator';

export class CreateManyPredeterminedProductDto {
  @IsArray()
  data: CreatePredeterminedProductDto[];
}
