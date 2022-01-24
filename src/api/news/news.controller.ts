import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { NewsService } from './news.service';




@Controller('news')
@UseGuards(JwtAuthGuard) 
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get(':keywords')
  getNews(@Param('keywords') keywords) {
    
    return this.newsService.getNews(keywords);
  }

}
