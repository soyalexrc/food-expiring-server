import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { Response } from 'express';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, res: Response) {
    try {
      const data = await this.categoryModel.create(createCategoryDto);
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
      const data = await this.categoryModel.find();
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
      const category = await this.categoryModel.findById(id);

      if (!category) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro una categoria con el id: ${id}`,
          error: true,
        });
        return;
      }

      res.status(HttpStatus.OK).send({
        data: category,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    res: Response,
  ) {
    try {
      const category = await this.categoryModel.findById(id);

      if (!category) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro una categoria con el id: ${id}`,
          error: true,
        });
        return;
      }

      const data = await category.updateOne(updateCategoryDto);

      res.status(HttpStatus.OK).send({
        message: data.acknowledged
          ? 'Se edito la categoria con exito!'
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
      const store = await this.categoryModel.findById(id);

      if (!store) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro una categoria con el id: ${id}`,
          error: true,
        });
        return;
      }

      const data = await store.deleteOne();

      res.status(HttpStatus.OK).send({
        data,
        message: `Se elimino la categoria ${store.title} con exito!`,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Ocurrio un error: ${JSON.stringify(err)}`,
        error: true,
      });
    }
  }
}
