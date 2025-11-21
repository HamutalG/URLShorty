import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import type { Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body('original') original: string) {
    return this.urlService.create(original);
  }

  @Get(':short')
  async redirect(@Param('short') short: string, @Res() res: Response) {
    const url = await this.urlService.find(short);
    if (url) {
      return res.redirect(url.original);
    }
    return res.status(404).send('Not found');
  }
}
