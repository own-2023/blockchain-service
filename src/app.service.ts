import { Inject, Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class AppService {

constructor() {}


async sendTransaction(from: string, to: string, value: number) {

}



  getHello(): string {
    return 'Hello World!';
  }
}
