import { Injectable, Logger } from '@nestjs/common';
import { CreatePredeterminedProductDto } from './dto/create-predetermined-product.dto';
import { UpdatePredeterminedProductDto } from './dto/update-predetermined-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PredeterminedProduct } from './entities/predetermined-product.entity';
import { CreateManyPredeterminedProductDto } from './dto/create-many-predetermined-product.dto';

@Injectable()
export class PredeterminedProductService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(PredeterminedProduct.name)
    private predeterminedProductModel: Model<PredeterminedProduct>,
  ) {}

  create(createPredeterminedProductDto: CreatePredeterminedProductDto) {
    return 'This action adds a new predeterminedProduct';
  }

  async createMany(
    createManyPredeterminedProductDto: CreateManyPredeterminedProductDto,
  ) {
    const { data } = createManyPredeterminedProductDto;
    console.log(data);
    try {
      return this.predeterminedProductModel.insertMany(data);
    } catch (e) {
      this.logger.error(e);
      return {
        error: true,
        message: e.message,
      };
    }
  }

  async findAll() {
    try {
      const data = await this.predeterminedProductModel.find();

      return data;
    } catch (e) {
      this.logger.error(e);
      return {
        error: true,
        message: e.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.predeterminedProductModel.findById(id);

      if (!data) {
        return {
          message: `No se encontro un producto con el id ${id}`,
          error: true,
        };
      }
      return {
        data,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        error: true,
        message: e.message,
      };
    }
  }

  update(
    id: string,
    updatePredeterminedProductDto: UpdatePredeterminedProductDto,
  ) {
    return `This action updates a #${id} predeterminedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} predeterminedProduct`;
  }
}
