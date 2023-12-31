import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
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
  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  userType: string;
}
