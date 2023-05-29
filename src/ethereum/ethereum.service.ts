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
}
