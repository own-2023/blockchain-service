import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';

import { MintNftDto } from './dto/mint-nft.dto';
import { LazyMintNftDto, UserLazyMintNftDto } from './dto/lazy-mint-nft.dto';
import { NftEntity } from './entities/nft.entity';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { NftRepository } from './repo/nft.repository';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { EthereumService } from 'src/ethereum/ethereum.service';

@Injectable()
export class NftService {
  constructor(
    @Inject('CONTRACT') private readonly contract: Contract,
    @Inject('WEB3') private readonly web3: Web3,
    private readonly nftRepository: NftRepository,
    private readonly ipfsService: IpfsService,
    private readonly ethereumService: EthereumService,
  ) {}

  async getPrice(tokenId: string): Promise<number> {
    try {
      const price = await this.contract.methods.getPrice(tokenId).call();
      return price;
    } catch (error) {
      return 0;
    }
  }

  async setPrice(nft: NftEntity, newPrice: number): Promise<number> {
    if (!nft) {
      throw new NotFoundException('NFT not found');
    }

    const ownerAccount = await this.ethereumService.getAccountBy(nft.owner_id);

    try {
      if (nft.isMinted) {
        await this.contract.methods
          .setPrice(nft.token_id, newPrice)
          .send({ from: ownerAccount.address });
      }
      await this.nftRepository.setPrice(nft, newPrice);
      return newPrice;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to set NFT price');
    }
  }

  async putOnSale(nft: NftEntity): Promise<void> {
    if (!nft) {
      throw new NotFoundException('NFT not found');
    }

    await this.nftRepository.setOnSale(nft, true);
  }

  async buy(nftId: string, buyerId: string): Promise<void> {
    const nft = await this.nftRepository.findOneNftById(nftId);

    if (!nft) {
      throw new NotFoundException('NFT not found');
    }

    const buyerAccount = await this.ethereumService.getAccountBy(buyerId);
    const sellerAccount = await this.ethereumService.getAccountBy(nft.owner_id);

    try {
      if (!nft.isMinted) {
        const transaction = await this.contract.methods
          .mint(`http://127.0.0.1:8080/ipfs/${nft.ipfsEntity.cid}`, nft.ipfsEntity.nft_name, nft.price)
          .send({ from: buyerAccount.address, gas: 4712388 });

        nft.token_id = transaction.events.Transfer.returnValues.tokenId;
        nft.isMinted = true;
      } else {
        const newPrice = await this.contract.methods.getPrice(nft.token_id).call();
        await this.nftRepository.setPrice(nft, newPrice);

        await this.contract.methods.buy(nft.token_id).send({
          from: buyerAccount.address,
          gas: 4712388,
          value: newPrice + 4800000,
        });
      }

      nft.owner_id = buyerId;
      nft.isOnSale = false;
      await this.ethereumService.withdraw(buyerId, nft.price.toString(), sellerAccount.address);
      await this.nftRepository.save(nft);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to buy NFT');
    }
  }

  async lazyMintNft(lazyMintNftDto: LazyMintNftDto): Promise<void> {
    await this.nftRepository.insertLazyMintNft(lazyMintNftDto);
  }

  async findOneById(nftId: string): Promise<NftEntity> {
    const nft = await this.nftRepository.findOneNftById(nftId);

    if (!nft) {
      throw new NotFoundException('NFT not found');
    }

    return nft;
  }

  async getAllNftsOnSale(): Promise<NftEntity[]> {
    return await this.nftRepository.getAllNftsOnSale();
  }

  async getAllNftsOnSaleOwnedBy(ownerId: string): Promise<NftEntity[]> {
    return await this.nftRepository.getAllNftsOwnedBy(ownerId);
  }

  getNftViewUrl(cid: string): string {
    return `http://127.0.0.1:8080/ipfs/${cid}`;
  }

  async getAllNftsOwnedBy(ownerId: string): Promise<NftEntity[]> {
    return await this.nftRepository.getAllNftsOwnedBy(ownerId);
  }

  async findOneByNft(nftId: string): Promise<NftEntity> {
    const nft = await this.nftRepository.findOneNftById(nftId);

    if (!nft) {
      throw new NotFoundException('NFT not found');
    }

    return nft;
  }

  async getUserLazyMintedNfts(userId: string): Promise<UserLazyMintNftDto[]> {
    return await this.nftRepository.getAllLazyMintedByUserId(userId);
  }
}
