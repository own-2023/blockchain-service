import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { NftEntity } from '../entities/nft.entity';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { LazyMintNftDto, UserLazyMintNftDto } from '../dto/lazy-mint-nft.dto';

@Injectable()
export class NftRepository {
  constructor(
    @InjectRepository(NftEntity)
    private nftEntityRepository: Repository<NftEntity>,
    @InjectRepository(IpfsEntity)
    private ipfsEntityRepository: Repository<IpfsEntity>,
    @Inject('IPFS') private readonly ipfs: IPFSHTTPClient,
  ) {}

  async getAllOwnedTokens(userId: string) {
    return this.nftEntityRepository.findOne({
      where: {
        owner_id: userId,
      },
      relations: {
        ipfsEntity: true,
      },
    });
  }

  async setOwnerId(nft: NftEntity, ownerId: string) {
    nft.owner_id = ownerId;
    try {
      await this.nftEntityRepository.save(nft);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getOwnedNftByTokenId(token_id: string) {
    return this.nftEntityRepository.findOne({
      where: {
        token_id: token_id,
      },
    });
  }

  async getAllNftsOnSale() {
    try {
      return this.nftEntityRepository.find({
        relations: { ipfsEntity: true },
        where: { isOnSale: true },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async setPrice(nft: NftEntity, newPrice: number) {
    nft.price = newPrice;
    try {
      await this.nftEntityRepository.save(nft);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async insertLazyMintNft(lazyMintNftDto: LazyMintNftDto) {
    const nft = new NftEntity();
    nft.owner_id = lazyMintNftDto.ownerId;
    nft.ipfs_id = lazyMintNftDto.ipfsId;
    nft.price = lazyMintNftDto.price;
    nft.created_at = new Date();
    try {
      await this.nftEntityRepository.save(nft);
    } catch (err) {
      console.error(err);
    }
  }

  async setMinted(nft: NftEntity, isMinted: boolean) {
    try {
      nft.isMinted = isMinted;
      await this.nftEntityRepository.save(nft);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async setTokenId(nft: NftEntity, tokenId: string) {
    // Implement your logic here
  }

  async insertMintedNft(nft: NftEntity, tokenId: string) {
    try {
      nft.token_id = tokenId;
      await this.nftEntityRepository.save(nft);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async save(nft: NftEntity) {
    try {
      await this.nftEntityRepository.save(nft);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getAllNftsOwnedBy(ownerId: string) {
    try {
      return this.nftEntityRepository.find({
        where: {
          owner_id: ownerId,
        },
        relations: {
          ipfsEntity: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getAllLazyMintedByUserId(userId: string) {
    const nfts = await this.ipfsEntityRepository.find({
      where: { creator_id: userId },
    });

    return nfts.map(nft => {
      const userLazyMintNftDTO = new UserLazyMintNftDto();
      userLazyMintNftDTO.id = nft.id;
      userLazyMintNftDTO.creator_id = nft.creator_id;
      userLazyMintNftDTO.cid = nft.cid;
      userLazyMintNftDTO.nftName = nft.nft_name;
      userLazyMintNftDTO.created_at = nft.created_at;
      return userLazyMintNftDTO;
    });
  }

  async findOneNftById(nftId: string) {
    try {
      return this.nftEntityRepository.findOne({
        relations: {
          ipfsEntity: true,
        },
        where: {
          nft_id: nftId,
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async setOnSale(nft: NftEntity, isOnSale: boolean) {
    nft.isOnSale = isOnSale;
    try {
      await this.nftEntityRepository.save(nft);
    } catch (err) {
      console.error(err);
    }
  }
}