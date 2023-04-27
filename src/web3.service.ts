/*
import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class Web3Service {

  constructor(private readonly web3: Web3) {}

  async getWeb3ClientVersion(): Promise<string> {
    const version = await this.web3.eth.getNodeInfo();
    return version;
  }

  async getTransaction(transactionHash: string): Promise<any> {
    const transaction = await this.web3.eth.getTransaction(transactionHash);
    if (!transaction) {
      throw new Error(`Transaction ${transactionHash} not found`);
    }
    return transaction;
  }

  async sendTransaction(from: string, to: string, value: number): Promise<string> {
    const nonce = await this.web3.eth.getTransactionCount(from, 'latest');
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasLimit = 21000;
    const transaction = {
      from,
      to,
      value: this.web3.utils.toWei(value.toString(), 'ether'),
      gasPrice,
      gasLimit,
      nonce,
    };
    const transactionHash = await this.web3.eth.sendTransaction(transaction);
    return transactionHash.transactionHash;
  }
}
*/