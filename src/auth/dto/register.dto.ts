import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  masterPassword: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  userType: string;
}
