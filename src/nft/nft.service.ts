import { Inject, Injectable } from '@nestjs/common';
import { MintNftDto } from './dto/nft.dto';
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
      price = await this.contract.methods.getPrice(tokenId).call();
    }
    catch (e) {
    }
    
    return price;
  }

  async setPrice(tokenId: number, newPrice: number) {
    let price = 0;
    try {
      // console.log(this.contract.methods);
      price = await this.contract.methods.setPrice(tokenId, newPrice).send();
    }
    catch (e) {
    }
    
    return price;
  }

  async mint(mintNftDto: MintNftDto) {
    let tokenId: number = -1
    try {
      tokenId = await this.contract.methods.mint(mintNftDto.imageUrl, mintNftDto.name ,mintNftDto.price).send();
    }
    catch (e) {
      console.log(e.message);
    }
    return tokenId;
  }

  async buy(tokenId: number) {
    try {
      // console.log(this.contract.methods);
      return await this.contract.methods.buy(tokenId).send();
    }
    catch (e) {
      console.log(e.message);
    }
    
    return;
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
