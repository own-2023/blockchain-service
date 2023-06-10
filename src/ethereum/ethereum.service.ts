import { Injectable, Inject } from '@nestjs/common';
import Web3 from 'web3';
import { EthereumAccountRepository } from './repositories/ethereum-account.repository';

@Injectable()
export class EthereumService {

    constructor(@Inject('WEB3') private readonly web3: Web3,
        private ethereumAccountRepository: EthereumAccountRepository) { }

    async createAccount(userId: string) {
        const account = this.web3.eth.accounts.create();
        await this.ethereumAccountRepository.saveAccount(userId, account);
    }

    async getAccount(userId: string) {
        const response = await this.ethereumAccountRepository.getAccount(userId);
        return { privateKey: response.private_key, address: response.address };
    }

    async getBalance(address: string) {
        const balance = await this.web3.eth.getBalance(address);
        return { balance };
    }

    async getAccountBy(userId: string){
        return await this.ethereumAccountRepository.findAccountBy(userId);
    }
}
