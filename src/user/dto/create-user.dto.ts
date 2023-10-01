import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  dni: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  userType: string;
}
