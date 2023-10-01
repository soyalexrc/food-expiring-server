import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  isActive: boolean;

  @Prop({ required: true })
  dueDate: Date;

  // TODO validar type number or string
  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  quantityMeasure: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
