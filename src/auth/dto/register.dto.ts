import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  userType: string;
}
