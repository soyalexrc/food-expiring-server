import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  dni: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  isActive: boolean;

  @Prop({ default: 'common' })
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
