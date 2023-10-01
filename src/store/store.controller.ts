import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Res
} from "@nestjs/common";
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Response } from "express";

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto, @Res() res: Response) {
    return this.storeService.create(createStoreDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.storeService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.storeService.findOne(id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto, @Res() res: Response) {
    return this.storeService.update(id, updateStoreDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.storeService.remove(id, res);
  }
}
