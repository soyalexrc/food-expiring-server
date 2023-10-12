import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store {
  @Prop({ required: true, unique: true })
  companyName: string;

  @Prop({ required: true })
  ruc: string;

  @Prop()
  openingHours: Date;

  @Prop()
  description: string;

  @Prop()
  banner: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  address: string;

  @Prop()
  contactPhone: string;

  @Prop()
  contactEmail: string;

  @Prop()
  isActive: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
