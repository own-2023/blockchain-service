import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EthereumAccountEntity } from "../entities/ethereum-account.entity";
import { Repository } from "typeorm";

@Injectable()
export class EthereumAccountRepository{
    constructor(@InjectRepository(EthereumAccountEntity) private ethereumAccountRepository: Repository<EthereumAccountEntity>){


    }

    async saveAccount(account: any){
        

    }


}