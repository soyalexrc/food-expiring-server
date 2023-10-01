import { IsString } from 'class-validator';

export class LoginBiometricsDto {
  @IsString()
  id: string;
}
