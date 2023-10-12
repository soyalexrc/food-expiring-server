import { IsEmail, IsString } from 'class-validator';

export class ValidateOtpDto {
  @IsString()
  code: string;

  @IsString()
  @IsEmail()
  email: string;
}
