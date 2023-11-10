import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PredeterminedProductService } from './predetermined-product.service';
import { CreatePredeterminedProductDto } from './dto/create-predetermined-product.dto';
import { UpdatePredeterminedProductDto } from './dto/update-predetermined-product.dto';
import { CreateManyPredeterminedProductDto } from './dto/create-many-predetermined-product.dto';

@Controller('predetermined-product')
export class PredeterminedProductController {
  constructor(
    private readonly predeterminedProductService: PredeterminedProductService,
  ) {}

  @Post()
  create(@Body() createPredeterminedProductDto: CreatePredeterminedProductDto) {
    return this.predeterminedProductService.create(
      createPredeterminedProductDto,
    );
  }

  @Post('/many')
  createMany(
    @Body()
    createManyPredeterminedProductDto: CreateManyPredeterminedProductDto,
  ) {
    return this.predeterminedProductService.createMany(
      createManyPredeterminedProductDto,
    );
  }

  @Get()
  findAll() {
    return this.predeterminedProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predeterminedProductService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredeterminedProductDto: UpdatePredeterminedProductDto,
  ) {
    return this.predeterminedProductService.update(
      id,
      updatePredeterminedProductDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predeterminedProductService.remove(+id);
  }
}
