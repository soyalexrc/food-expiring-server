import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterEmailPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  dni: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsArray()
  addresses: any[];

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  userType: string;
}
