import { IsEmail, IsString } from 'class-validator';

export class LoginEmailPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
