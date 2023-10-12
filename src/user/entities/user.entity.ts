import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  dni: string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  isActive: boolean;

  @Prop({ default: 'common' })
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
