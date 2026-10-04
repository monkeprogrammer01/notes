import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("healthz")
  health(): { status: string } {
    return { status: "ok" }
  }

  @Post('notes')
  notes(@Body() data: { text: string }) {
    return this.appService.createNote(data.text);
  }
  @Get('notes')
  list() {
    return this.appService.listNotes();
  }
  @Get('/notes/:id')
  getNote(id: number){
    return this.appService.getNote(Number(id));
  }
}
