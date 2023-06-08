import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { Repository } from 'typeorm';

import { MintedNftEntity } from '../entities/minted-nft.entity';
import { MintNftDto } from '../dto/mint-nft.dto';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { Result } from 'ethers';
import { LazyMintNftDto } from '../dto/lazy-mint-nft.dto';
import { NftEntity } from '../entities/nft.entity';


@Injectable()
export class NftRepository {

  constructor(
    @InjectRepository(MintedNftEntity) private mintedNftEntity: Repository<MintedNftEntity>,
    @InjectRepository(NftEntity) private nftEntityRepository: Repository<NftEntity>,
    @Inject('IPFS') private readonly ipfs: IPFSHTTPClient) { }

  async getAllOwnedTokens(userId: string) {
    const userNfts = await this.nftEntityRepository.findOne({
      where: {
        owner_id: userId,
        mintedNftEntity: {

        }
      },
      relations: {
        ipfsEntity: true,
      }
    })
    return userNfts;
  }

  async getOwnedNftByTokenId(token_id: string) {
    const userNfts = await this.mintedNftEntity.findOneBy({
      token_id: token_id
    });
    return userNfts;
  }



  async insertLazyMintNft(lazyMintNftDto: LazyMintNftDto) {
    this.nftEntityRepository.save([{
      owner_id: lazyMintNftDto.ownerId,
      price: lazyMintNftDto.price,
      created_at: new Date(),
      ipfsEntity: {
        id: lazyMintNftDto.ipfsId,
      }
    }])
  }

  async insertNft(mintNftDto: MintNftDto, result: Result) {
    await this.mintedNftEntity.save([{
      name: mintNftDto.name,
      token_id: result.tokenId,
      price: mintNftDto.price,
      created_at: new Date(),
      user_id: mintNftDto.userId
    }]);
  }

  async getAllNftsOwnedBy(ownerId: string) {
    return await this.nftEntityRepository.find({
      where: {
        owner_id: ownerId,
      },
      relations: {
        ipfsEntity: true,
      }
    })
  }

  async setPrice(nft: NftEntity, newPrice: number) {
    nft.price = newPrice;
    try {
      this.nftEntityRepository.save(nft);
    }
    catch (err) {
      console.log(err);
    }
  }


  async findOneNftById(nftId: string) {
    try {
      return await this.nftEntityRepository.findOne({
        relations: {
          ipfsEntity: true,
          mintedNftEntity: true,
        },
        where: {
          nft_id: nftId
        }

      })
    }
    catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async setOnSale(nft: NftEntity) {
    nft.isOnSale = true;
    try {
      await this.nftEntityRepository.save(nft);
    }
    catch (err) {
      console.log(err);
    }
  }
}