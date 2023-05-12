import { Inject, Injectable } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Contract } from 'web3-eth-contract';

@Injectable()
export class NftService {

  constructor(@Inject('CONTRACT') private readonly contract: Contract,
  ) {}

  async getPrice(tokenId: number) {
    let price = 0;
    try {
      // console.log(this.contract.methods);
      price = await this.contract.methods.getPrice(1).call();
    }
    catch (e) {
    }
    
    return price;
  }

  create(createNftDto: CreateNftDto) {
    return 'This action adds a new nft';
  }

  findAll() {
    return `This action returns all nft`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`;
  }

  update(id: number, updateNftDto: UpdateNftDto) {
    return `This action updates a #${id} nft`;
  }

  remove(id: number) {
    return `This action removes a #${id} nft`;
  }
}
