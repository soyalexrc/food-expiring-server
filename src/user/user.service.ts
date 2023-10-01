import {
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly logger = new Logger();

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto, res: Response) {
    try {
      const data = await this.userModel.create(createUserDto);
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se creo el usuario con exito!',
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.userModel.find();
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }

  async findOne(id: string, res: Response) {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro un usuario con el id: ${id}`,
          error: true,
        });
        return;
      }

      res.status(HttpStatus.OK).send({
        data: user,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, res: Response) {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro un usuario con el id: ${id}`,
          error: true,
        });
        return;
      }

      const data = await user.updateOne(updateUserDto);

      res.status(HttpStatus.OK).send({
        message: data.acknowledged
          ? 'Se edito el usuario con exito!'
          : 'No se logro completar la accion...',
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }

  async remove(id: string, res: Response) {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro un usuario con el id: ${id}`,
          error: true,
        });
        return;
      }

      const data = await user.deleteOne();

      res.status(HttpStatus.OK).send({
        data,
        message: `Se elimino el usuario ${user.email} con exito!`,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }
}
