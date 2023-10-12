import { IsString } from 'class-validator';

export class CreateOtpDto {
  @IsString()
  to: string;
}
