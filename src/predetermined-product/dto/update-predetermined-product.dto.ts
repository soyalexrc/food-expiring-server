import { PartialType } from '@nestjs/mapped-types';
import { CreatePredeterminedProductDto } from './create-predetermined-product.dto';

export class UpdatePredeterminedProductDto extends PartialType(CreatePredeterminedProductDto) {}
