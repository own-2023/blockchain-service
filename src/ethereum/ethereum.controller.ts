import { Controller, Inject, Post } from '@nestjs/common';
import { EthereumService } from './ethereum.service';

@Controller('ethereum')
export class EthereumController {

    constructor(@Inject() private ethereumService: EthereumService) { }

    @Post('create')
    async createEthereumAccount() {
await this.ethereumService
    }


}
