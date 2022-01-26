import { Controller, Get, Param, Post, Res, UseGuards,Request } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { NewsService } from './news.service';




@Controller('news')
@UseGuards(JwtAuthGuard) 
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get(':topic')
  async getPdf(@Param('topic') topic,@Res() res,@Request() req) {

    let pdfName=req.user.id+topic;


    let pdfPath=await this.newsService.createPdf(topic,pdfName);
    const file = createReadStream(join(pdfPath)); 
    file.pipe(res);
    
     
  }

}
