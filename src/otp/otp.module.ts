import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './entities/otp.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
  ],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
