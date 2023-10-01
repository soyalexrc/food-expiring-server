import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { Response } from 'express';

@Injectable()
export class ProductService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, res: Response) {
    try {
      const data = await this.productModel.create(createProductDto);
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se creo la categoria con exito!',
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
      const data = await this.productModel.find();
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
      const product = await this.productModel.findById(id);

      if (!product) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro un producto con el id: ${id}`,
          error: true,
        });
        return;
      }

      res.status(HttpStatus.OK).send({
        data: product,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, res: Response) {
    try {
      const category = await this.productModel.findById(id);

      if (!category) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro un producto con el id: ${id}`,
          error: true,
        });
        return;
      }

      const data = await category.updateOne(updateProductDto);

      res.status(HttpStatus.OK).send({
        message: data.acknowledged
          ? 'Se edito el producto con exito!'
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
      const store = await this.productModel.findById(id);

      if (!store) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro un producto con el id: ${id}`,
          error: true,
        });
        return;
      }

      const data = await store.deleteOne();

      res.status(HttpStatus.OK).send({
        data,
        message: `Se elimino el producto ${store.title} con exito!`,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }
}
