import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EthTransactionsService } from './eth-transactions.service';
import { CreateEthTransactionDto } from './dto/create-eth-transaction.dto';
import { UpdateEthTransactionDto } from './dto/update-eth-transaction.dto';

@Controller('eth-transactions')
export class EthTransactionsController {
  constructor(private readonly ethTransactionsService: EthTransactionsService) {}

  @Post()
  create(@Body() createEthTransactionDto: CreateEthTransactionDto) {
    return this.ethTransactionsService.create(createEthTransactionDto);
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
