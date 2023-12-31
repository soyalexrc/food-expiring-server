import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { LoginEmailPasswordDto } from './dto/login-email-password.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginBiometricsDto } from './dto/login-biometrics.dto';
import { RegisterEmailPasswordDto } from './dto/register-email-password.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async register(registerDto: RegisterDto, res: Response) {
    const { email, isActive, userType } = registerDto;

    this.logger.debug(registerDto);
    try {
      const data = await this.userModel.create({
        email,
        isActive,
        userType,
      });

      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
      });
    }
  }

  async registerWithEmailAndPassword(
    registerEmailPasswordDto: RegisterEmailPasswordDto,
    res: Response,
  ) {
    const {
      email,
      password,
      name,
      lastName,
      isActive,
      userType,
      dni,
      addresses,
      phoneNumber,
    } = registerEmailPasswordDto;
    try {
      const userExistByEmail = await this.userModel.findOne({ email });

      if (userExistByEmail) {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: `Ya existe un usuario con el correo : ${email}, ingresa otro correo electronico`,
        });
        return;
      }

      const data = await this.userModel.create({
        email,
        password: bcrypt.hashSync(password, 10),
        name,
        lastName,
        isActive,
        userType,
        dni,
        addresses,
        phoneNumber,
      });

      res.status(HttpStatus.OK).send({
        message: `Bienvenido/@, ${data.name}`,
        user: data,
        token: this.getJwtToken({ id: data.id }),
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      });
    }
  }
  async loginWithEmailAndPassword(
    loginEmailPasswordDto: LoginEmailPasswordDto,
    res: Response,
  ) {
    try {
      const { email, password } = loginEmailPasswordDto;
      this.logger.debug({
        email,
        password,
      });
      const user = await this.userModel.findOne({ email: email });

      this.logger.debug(user);
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `Error de credenciales: no se encontro un usuario con el email ${email}`,
        });
        return;
      } else if (!user.isActive) {
        res.status(HttpStatus.FORBIDDEN).send({
          error: true,
          title: `El usuario (${email}) se encuentra deshabilitado`,
          message: `Por favor comuniquese con el administrador para poder ingresar de nuevo.`,
        });
        return;
      } else if (!bcrypt.compareSync(password, user.password)) {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: `Error de credenciales: contrasenas no coinciden!`,
        });
        return;
      } else {
        res.status(HttpStatus.OK).send({
          token: this.getJwtToken({ id: user.id }),
          message: `Bienvenido/@, ${user.email}`,
          user,
          // allowedRoutes: getAllowedRoutesByRole(user.userType),
        });
      }
    } catch (err) {
      this.logger.error(err);
      return {
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }
  async loginWithBiometrics(
    loginBiometrics: LoginBiometricsDto,
    res: Response,
  ) {
    try {
      const { id } = loginBiometrics;
      const user = await this.userModel.findById(id);

      this.logger.debug(user);
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `Error de credenciales: no se encontro un usuario`,
        });
        return;
      } else if (!user.isActive) {
        res.status(HttpStatus.FORBIDDEN).send({
          error: true,
          title: `El usuario se encuentra deshabilitado`,
          message: `Por favor comuniquese con el administrador para poder ingresar de nuevo.`,
        });
        return;
      } else {
        res.status(HttpStatus.OK).send({
          token: this.getJwtToken({ id: user.id }),
          message: `Bienvenido/@ de vuelta, ${user.email}`,
          user,
          // allowedRoutes: getAllowedRoutesByRole(user.userType),
        });
      }
    } catch (err) {
      this.logger.error(err);
      return {
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }

  forgotPassword(id: number) {
    return `This action returns a #${id} auth`;
  }

  resetPassword(id: number) {
    return `This action updates a #${id} auth`;
  }
}
