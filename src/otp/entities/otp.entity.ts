import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, default: false })
  validated: boolean;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
