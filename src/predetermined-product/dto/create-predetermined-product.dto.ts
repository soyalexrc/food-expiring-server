import { IsString } from 'class-validator';

export class CreatePredeterminedProductDto {
  @IsString()
  source: string;

  @IsString()
  title: string;

  @IsString()
  src: string;
}
