import { Controller, Inject, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ethereum')
export class EthereumController {

    constructor(private ethereumService: EthereumService) { }

    @Post('create')
    @UseGuards(AuthGuard)
    async createEthereumAccount(@Req() request: Request) {
        const userId: string = request['user'].user_id;
        await this.ethereumService.createAccount(userId)
    }

    @Get('get-account')
    @UseGuards(AuthGuard)
    async getEthereumAccount(@Req() request: Request) {
        const userId: string = request['user'].user_id;
        const response = await this.ethereumService.getAccount(userId);
        return { address: response.address, private_key: response.privateKey };
    }

    @Get('get-balance/:address')
    @UseGuards(AuthGuard)
    async getEthereumBalance(@Param('address') address: string, @Req() request: Request) {
        const userId: string = request['user'].user_id;
        const balance = await this.ethereumService.getBalanceEth(address);
        return balance;
    }

    @Post('withdraw')
    @UseGuards(AuthGuard)
    async withdraw(@Req() request: Request){
        console.log(request); 
    }


}
