import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EthereumAccountEntity } from "../entities/ethereum-account.entity";
import { Repository } from "typeorm";

type Account = {
    address: string,
    privateKey: string,
}

@Injectable()
export class EthereumAccountRepository {
    constructor(@InjectRepository(EthereumAccountEntity) private ethereumAccountRepository: Repository<EthereumAccountEntity>) { }
    async saveAccount(user_id: string, account: Account) {
        this.ethereumAccountRepository.save({
            address: account.address,
            private_key: account.privateKey,
            user_id: user_id,
        })
    }

    async incrementNonceOf(address: string) {
        try {
            const wallet = await this.ethereumAccountRepository.findOneBy({ address });
            wallet.nonce += 1;
            await this.ethereumAccountRepository.save(wallet);
        }
        catch (err) {
            console.log(err);
        }
    }

    async findAccountBy(userId: string) {
        try {
            const wallet = await this.ethereumAccountRepository.findOne({ where: { user_id: userId } })
            return wallet;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getAccount(userId: string) {
        const account = await this.ethereumAccountRepository.findOne({
            where: {
                user_id: userId
            }
        });
        return account;
    }
}