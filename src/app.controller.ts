import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
type Hello = {
  Description: string;
  Method: string;
  Url: string;
  Body: BodiContent;
};
type BodiContent = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiTags('Menu')
  @Get()
  getHello(): Hello[] {
    return this.appService.getHello();
  }
}
