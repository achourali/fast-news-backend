import { Controller, Get, Res, Sse } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { interval, map, Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello() {
    await new Promise(resolve => setTimeout(resolve, 35000));
    return this.appService.getHello();
  }

  @Get('/getFile')
  getFile(@Res() res) {
    const file = createReadStream(join('/tmp/test.pdf'));
    file.pipe(res);
  }



}
 