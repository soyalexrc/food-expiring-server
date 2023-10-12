import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './entities/store.entity';
import { Response } from 'express';

@Injectable()
export class StoreService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}
  async create(createStoreDto: CreateStoreDto, res: Response) {
    try {
      const data = await this.storeModel.create(createStoreDto);
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se creo la tienda con exito!',
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
      const data = await this.storeModel.find();
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
      const store = await this.storeModel.findById(id);

      if (!store) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro una tienda con el id: ${id}`,
          error: true,
        });
        return;
      }

      res.status(HttpStatus.OK).send({
        data: store,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }

  async update(id: string, updateStoreDto: UpdateStoreDto, res: Response) {
    try {
      const store = await this.storeModel.findById(id);

      if (!store) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro una tienda con el id: ${id}`,
          error: true,
        });
        return;
      }

      const data = await store.updateOne(updateStoreDto);

      res.status(HttpStatus.OK).send({
        message: data.acknowledged
          ? 'Se edito la tienda con exito!'
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
      const store = await this.storeModel.findById(id);

      if (!store) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro un usuario con el id: ${id}`,
          error: true,
        });
        return;
      }

      const data = await store.deleteOne();

      res.status(HttpStatus.OK).send({
        data,
        message: `Se elimino la tienda ${store.companyName} con exito!`,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }
}
