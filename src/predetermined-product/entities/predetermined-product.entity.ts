import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PredeterminedProductDocument =
  HydratedDocument<PredeterminedProduct>;

@Schema()
export class PredeterminedProduct {
  @Prop()
  src: string;

  @Prop()
  title: string;

  @Prop()
  source: string;
}

export const PredeterminedProductSchema =
  SchemaFactory.createForClass(PredeterminedProduct);
