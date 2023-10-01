import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Res
} from "@nestjs/common";
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from "express";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    return this.productService.create(createProductDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.productService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.productService.findOne(id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    return this.productService.update(id, updateProductDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.productService.remove(id, res);
  }
}
