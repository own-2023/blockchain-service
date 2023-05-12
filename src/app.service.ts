import { Inject, Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class AppService {

constructor(@Inject('WEB3') private readonly web3: Web3) {}


async sendTransaction(from: string, to: string, value: number) {

}


async getWeb3ClientVersion() {
  const version = await this.web3.eth.getNodeInfo();
  return { version };
}


  getHello(): string {
    return 'Hello World!';
  }
}
