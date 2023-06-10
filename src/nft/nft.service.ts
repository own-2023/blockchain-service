import { Inject, Injectable } from '@nestjs/common';
import { MintNftDto } from './dto/mint-nft.dto';
import { Contract } from 'web3-eth-contract';
import { IpfsService } from 'src/ipfs/ipfs.service';
import Web3 from 'web3';
import { NftRepository } from './repo/nft.repository';
import { LazyMintNftDto } from './dto/lazy-mint-nft.dto';
import { NftEntity } from './entities/nft.entity';


@Injectable()
export class NftService {

  constructor(@Inject('CONTRACT') private readonly contract: Contract,
    @Inject('WEB3') private readonly web3: Web3,
    private readonly nftRepository: NftRepository,
    private readonly ipfsService: IpfsService,
  ) { }

  async getPrice(tokenId: string) {
    let price = 0;
    try {
      price = await this.contract.methods.getPrice(tokenId).call();
    }
    catch (e) {
    }
    return price;
  }

  async putOnSale(nft: NftEntity, newPrice: number) {
    if (nft.isMinted === true) {
      await this.nftRepository.setPrice(nft, newPrice);
      await this.nftRepository.setOnSale(nft);
      await this.contract.methods.setPrice(nft.mintedNftEntity.token_id, newPrice).send();
    }
    else {
      await this.nftRepository.setOnSale(nft);
      await this.nftRepository.setPrice(nft, newPrice);
    }
    return newPrice;
  }

  async mint(mintNftDto: MintNftDto) {
    let transactionHash: any = -1;
    // const gasPrice = await this.web3.eth.getGasPrice();
    // const gasLimit = 21000;
    try {
      transactionHash = await this.contract.methods.mint(mintNftDto.imageUrl, mintNftDto.name, mintNftDto.price)
        .send({ from: mintNftDto.from, gas: 4712388 });
      this.nftRepository.insertNft(mintNftDto, transactionHash['events']['Transfer']['returnValues']);
    }
    catch (e) {
      console.log(e.message);
    }
    return transactionHash;
  }

  async buy(tokenId: number) {
    try {
      return await this.contract.methods.buy(tokenId).send();
    }
    catch (e) {
      console.log(e.message);
    }

    return;
  }

  async lazyMintNft(lazyMintNftDto: LazyMintNftDto) {
    await this.nftRepository.insertLazyMintNft(lazyMintNftDto);
  }

  async findOneById(nftId: string) {
    let nft: NftEntity;
    try {
      nft = await this.nftRepository.findOneNftById(nftId);
    }
    catch (error) {
      console.log(error);
    }

    return nft;
  }

  async buyNft(buyerId: number, tokenId: string): Promise<any> {
    const nftPrice = this.getPrice(tokenId);
    this.contract.methods.buy(tokenId).send({ from: buyerId, value: nftPrice });
  }

  async getAllNfts() {
    let nfts: NftEntity[] = [];
    try {
      const mintedNfts = await this.contract.methods.getAllImageMetadatas().call();
      nfts = nfts.concat(mintedNfts);
    }
    catch (err) {
      console.log(err);
    }

    try {
      const lazyNfts = await this.nftRepository.getAllNftsOnSale();
      nfts = nfts.concat(lazyNfts);
    }
    catch (err) {
      console.log(err);
    }
    return nfts;
  }

  async getAllNftsOwnedBy(ownerId: string) {
    return await this.nftRepository.getAllNftsOwnedBy(ownerId);
  }

  async findOneByNft(nftId: string) {
    const nft = await this.nftRepository.findOneNftById(nftId);
    return nft
  }

  async getUserLazyMintedNfts(userId: string) {
    const nft = await this.nftRepository.getAllLazyMintedByUserId(userId);
    return nft;

  }
}
