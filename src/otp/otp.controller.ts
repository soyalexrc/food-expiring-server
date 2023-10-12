import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { Response } from 'express';
import { ValidateOtpDto } from './dto/validate-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post()
  create(@Body() createOtpDto: CreateOtpDto, @Res() res: Response) {
    return this.otpService.create(createOtpDto, res);
  }

  @Post('/validateOtp')
  validateOtp(@Body() validateOtpDto: ValidateOtpDto, @Res() res: Response) {
    return this.otpService.validateOtp(validateOtpDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.otpService.findAll(res);
  }

  @Get('getByEmail/:email')
  findByEmail(@Param('email') email: string, @Res() res: Response) {
    return this.otpService.findByEmail(email, res);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.otpService.remove(id, res);
  }
}
