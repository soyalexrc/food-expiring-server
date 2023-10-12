import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  companyName: string;

  @IsString()
  @IsEmail()
  contactEmail: string;

  @IsString()
  openingHours: string;

  @IsString()
  description: string;

  @IsString()
  banner: string;

  @IsString()
  ruc: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsString()
  contactPhone: string;

  @IsBoolean()
  isActive: boolean;
}
