import { IsBoolean, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  dueDate: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  price: string;

  @IsString()
  quantity: number;

  @IsString()
  quantityMeasure: string;
}
