import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MintNftDto } from './dto/mint-nft.dto';
import { Contract } from 'web3-eth-contract';
import { IpfsService } from 'src/ipfs/ipfs.service';
import Web3 from 'web3';
import { NftRepository } from './repo/nft.repository';
import { LazyMintNftDto } from './dto/lazy-mint-nft.dto';
import { NftEntity } from './entities/nft.entity';
import { EthereumService } from 'src/ethereum/ethereum.service';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';

type Nft = { nftName: string, nftImageUrl: string, nftPrice: number, nftId: string, isMinted: boolean }


@Injectable()
export class NftService {

  constructor(@Inject('CONTRACT') private readonly contract: Contract,
    @Inject('WEB3') private readonly web3: Web3,
    private readonly nftRepository: NftRepository,
    private readonly ipfsService: IpfsService,
    private readonly ethereumService: EthereumService,
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

  async setPrice(nft: NftEntity, newPrice: number) {
    const ownerAccount = await this.ethereumService.getAccountBy(nft.owner_id);
    if (nft.isMinted) {
      try {
        await this.contract.methods.setPrice(nft.token_id, newPrice).send({ from: ownerAccount.address });
      }
      catch (err) {
        console.error(err);
        throw new InternalServerErrorException();
      }
    }
    await this.nftRepository.setPrice(nft, newPrice);
    return newPrice;
  }
  async putOnSale(nft: NftEntity) {
    await this.nftRepository.setOnSale(nft, true);
  }

  async buy(nftId: string, buyerId: string,) {
    const nft = await this.nftRepository.findOneNftById(nftId);
    const buyerAccount = await this.ethereumService.getAccountBy(buyerId);
    const sellerAccount = await this.ethereumService.getAccountBy(nft.owner_id);
    console.log(buyerAccount);
    if (!nft.isMinted) {
      try {
        const transaction = await this.contract.methods.mint(`http://127.0.0.1:8080/ipfs/${nft.ipfsEntity.cid}`, nft.ipfsEntity.nft_name, nft.price)
          .send({ from: buyerAccount.address, gas: 4712388 });
        nft.token_id = transaction.events.Transfer.returnValues.tokenId;
        nft.isMinted = true;
      }
      catch (err) {
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
    else {
      const newPrice = await this.contract.methods.getPrice(nft.token_id).call();
      await this.nftRepository.setPrice(nft, newPrice);
      console.log(newPrice);
      await this.contract.methods.buy(nft.token_id).send({ from: buyerAccount.address, gas: 4712388, value:  newPrice + 4800000});
    }
    try {
      nft.owner_id = buyerId;
      nft.isOnSale = false;
      await this.ethereumService.withdraw(buyerId, nft.price.toString(), sellerAccount.address);
      await this.nftRepository.save(nft);
    }
    catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async lazyMintNft(lazyMintNftDto: LazyMintNftDto) {
    await this.nftRepository.insertLazyMintNft(lazyMintNftDto);
  }

  async findOneById(nftId: string) {
    return await this.nftRepository.findOneNftById(nftId);
  }



  async getAllNftsOnSale() {
    return await this.nftRepository.getAllNftsOnSale();
  }


  async getAllNftsOnSaleOwnedBy(ownerId: string) {
    return await this.nftRepository.getAllNftsOwnedBy(ownerId);
  }

  getNftViewUrl(cid: string) {
    return `http://127.0.0.1:8080/ipfs/${cid}`;
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
