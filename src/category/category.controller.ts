import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Res
} from "@nestjs/common";
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from "express";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
    return this.categoryService.create(createCategoryDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.categoryService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.categoryService.findOne(id, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response
  ) {
    return this.categoryService.update(id, updateCategoryDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.categoryService.remove(id, res);
  }
}
