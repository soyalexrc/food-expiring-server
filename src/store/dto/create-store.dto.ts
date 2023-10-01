import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateStoreDto {
  @IsString()
  title: string;

  @IsString()
  @IsEmail()
  emailOwner: string;

  @IsString()
  openingHours: string;

  @IsString()
  description: string;

  @IsString()
  banner: string;

  @IsString()
  dniOwner: string;

  @IsString()
  nameOwner: string;

  @IsString()
  lastNameOwner: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  phoneNumberOwner: string;

  @IsBoolean()
  isActive: boolean;
}
