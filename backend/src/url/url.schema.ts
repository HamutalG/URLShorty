import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop({ required: true })
  original: string;

  @Prop({ required: true, unique: true })
  short: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
