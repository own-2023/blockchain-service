import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Web3Service } from './web3.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly web3Service: Web3Service) {}

  /*
  @Get(':hash')
  async getTransaction(@Param('hash') hash: string) {
    const transaction = await this.web3Service.getTransaction(hash);
    return transaction;
  }
  */

  
  @Post()
  async sendTransaction(@Body() body: { from: string, to: string, value: number }) {
    const { from, to, value } = body;
    const transactionHash = await this.web3Service.sendTransaction(from, to, value);
    return { transactionHash };
  }

  @Get('web3-client-version')
  async getWeb3ClientVersion() {
    const version = await this.web3Service.getWeb3ClientVersion();
    return { version };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
