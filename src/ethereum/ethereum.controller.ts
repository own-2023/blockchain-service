import { Controller, Inject, Post, UseGuards, Req } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ethereum')
export class EthereumController {

    constructor(@Inject() private ethereumService: EthereumService) { }

    @Post('create')
    @UseGuards(AuthGuard)
    async createEthereumAccount(@Req() request: Request) {
        const userId: string = request['user'].user_id;
        await this.ethereumService.createAccount(userId)
    }

}
