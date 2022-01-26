import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { NewsService } from './news.service';




@Controller('news')
@UseGuards(JwtAuthGuard) 
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get(':keywords')
  async getPdf(@Param('keywords') keywords,@Res() res) {

    let pdfPath=await this.newsService.createPdf(keywords);
    const file = createReadStream(join(pdfPath));
    file.pipe(res);
    
     
  }

}
