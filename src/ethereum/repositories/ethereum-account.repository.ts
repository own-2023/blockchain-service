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

    async getAccount(userId: string) {
        return await this.ethereumAccountRepository.findOne({
            where: {
                user_id: userId
            }
          });


    }
     
}