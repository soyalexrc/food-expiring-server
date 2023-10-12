import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { Otp } from './entities/otp.entity';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { ValidateOtpDto } from './dto/validate-otp.dto';

@Injectable()
export class OtpService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private readonly configService: ConfigService,
  ) {}

  async create(createOtpDto: CreateOtpDto, res: Response) {
    const otp = this.generateOTP();
    try {
      const resend = new Resend(
        this.configService.get<string>('RESEND_API_KEY'),
      );

      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [createOtpDto.to],
        subject: 'Codigo de validacion',
        html: `<p>Su codigo de validacion es: <br> <b>${otp}</b></p>`,
      });
      const data = await this.otpModel.create({
        to: createOtpDto.to,
        code: otp,
      });

      res.status(HttpStatus.OK).send({
        data,
        message: `Se envio un codigo a ${createOtpDto.to}`,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }
  async validateOtp(validateOtp: ValidateOtpDto, res: Response) {
    const { email, code } = validateOtp;
    try {
      const otpsByEmail = await this.otpModel.find({
        to: email,
        validated: false,
      });

      this.logger.debug(otpsByEmail);

      if (otpsByEmail.length < 1) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `Ocurrio un error, no pudimos encontrar ningun codigo enviado a: ${email}, por favor inicia el proceso de verificacion nuevamente.`,
        });
        return;
      }

      const targetOtp = otpsByEmail.find((otp) => otp.code === code);

      if (!targetOtp) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `Codigo de verificacion invalido, ingresa el codigo nuevamente.`,
        });
        return;
      }

      await this.otpModel.updateOne(
        { _id: targetOtp._id },
        { validated: true },
      );

      res.status(HttpStatus.OK).send({
        message: `Se valido el codigo de verificacion con exito!`,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.otpModel.find();

      res.status(HttpStatus.OK).send({ data });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async findByEmail(email: string, res: Response) {
    try {
      const data = await this.otpModel.find({ to: email });

      res.status(HttpStatus.OK).send({ data });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  async remove(id: string, res: Response) {
    try {
      const otp = await this.otpModel.findById(id);

      if (!otp) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `No se encontro un codigo de verificacion con el id: ${id}`,
        });
        return;
      }

      const data = await this.otpModel.deleteOne();

      this.logger.debug(data);

      res
        .status(HttpStatus.OK)
        .send({ data, message: 'Se elimino el otp con exito!' });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  generateOTP(): string {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
}
