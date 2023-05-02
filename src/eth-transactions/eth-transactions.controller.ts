import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EthTransactionsService } from './eth-transactions.service';
import { CreateEthTransactionDto } from './dto/create-eth-transaction.dto';
import { UpdateEthTransactionDto } from './dto/update-eth-transaction.dto';
import { EthTransaction } from './entities/eth-transaction.entity';
import { instanceToPlain } from 'class-transformer';

@Controller('eth-transactions')
export class EthTransactionsController {
  constructor(private readonly ethTransactionsService: EthTransactionsService) {}

  @Get('web3-client-version')
  async getWeb3ClientVersion() {
    const version = await this.ethTransactionsService.getWeb3ClientVersion();
    return { version };
  }

  @Get('/hash/:transactionHash')
  async getTransactionHash(@Param('transactionHash') transactionHash: string) {
    const transaction = await this.ethTransactionsService.getTransaction(transactionHash);
    return { transaction };
  }

  @Post()
  async sendTransaction(@Body() createEthTransactionDto: CreateEthTransactionDto) {
    const { from, to, value } = createEthTransactionDto;
    const response = await this.ethTransactionsService.sendTransaction(from, to, value);
    return response;
  }


  @Post()
  create(@Body() createEthTransactionDto: CreateEthTransactionDto) {
    
    return this.ethTransactionsService.create(instanceToPlain(createEthTransactionDto));
  }

  @Get()
  findAll() {
    return this.ethTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ethTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEthTransactionDto: UpdateEthTransactionDto) {
    return this.ethTransactionsService.update(+id, updateEthTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ethTransactionsService.remove(+id);
  }
}
