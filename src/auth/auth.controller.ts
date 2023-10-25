import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginEmailPasswordDto } from './dto/login-email-password.dto';
import { LoginBiometricsDto } from './dto/login-biometrics.dto';
import { RegisterEmailPasswordDto } from "./dto/register-email-password.dto";

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

  @Post('registerWithEmailAndPassword')
  registerWithEmailAndPassword(
    @Body() registerEmailPasswordDto: RegisterEmailPasswordDto,
    @Res() res: Response,
  ) {
    return this.authService.registerWithEmailAndPassword(
      registerEmailPasswordDto,
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
