import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginEmailPasswordDto } from './dto/login-email-password.dto';
import { LoginBiometricsDto } from './dto/login-biometrics.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    return this.authService.register(registerDto, res);
  }
  @Post('loginWithEmailAndPassword')
  login(
    @Body() loginEmailPasswordDto: LoginEmailPasswordDto,
    @Res() res: Response,
  ) {
    return this.authService.loginWithEmailAndPassword(
      loginEmailPasswordDto,
      res,
    );
  }

  @Post('loginWithBiometrics')
  loginWithBiometrics(
    @Body() loginBiometrics: LoginBiometricsDto,
    @Res() res: Response,
  ) {
    return this.authService.loginWithBiometrics(loginBiometrics, res);
  }
}
