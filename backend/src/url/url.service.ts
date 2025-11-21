import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './url.schema';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  private generateShortCode(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  async create(original: string) {
    let short: string;
    let exists: UrlDocument | null;

    do {
      short = this.generateShortCode();
      exists = await this.urlModel.findOne({ short }).exec();
    } while (exists);

    const newUrl = new this.urlModel({ original, short });
    return newUrl.save();
  }

  async find(short: string) {
    return this.urlModel.findOne({ short }).exec();
  }
}
