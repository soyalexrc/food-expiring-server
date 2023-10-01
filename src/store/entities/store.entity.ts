import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  emailOwner: string;

  @Prop()
  openingHours: Date;

  @Prop()
  description: string;

  @Prop()
  banner: string;

  @Prop({ required: true })
  dniOwner: string;

  @Prop({ required: true })
  nameOwner: string;

  @Prop({ required: true })
  lastNameOwner: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  phoneNumberOwner: string;

  @Prop()
  isActive: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
