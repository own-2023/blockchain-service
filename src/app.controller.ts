import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
  @Get(':hash')
  async getTransaction(@Param('hash') hash: string) {
    const transaction = await this.web3Service.getTransaction(hash);
    return transaction;
  }
  */

  


  @Get('web3-client-version')
  async getWeb3ClientVersion() {
    const version = await this.appService.getWeb3ClientVersion();
    return { version };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
