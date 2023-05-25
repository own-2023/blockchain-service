import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { Repository } from 'typeorm';
import { UserAccountEntity } from '../entities/user-account.entity';
import { UserEntity } from '../entities/user.entity';
import { MintedNftEntity } from '../entities/minted-nft.entity';
import { MintNftDto } from '../dto/mint-nft.dto';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { Result } from 'ethers';
import { LazyMintNftDto } from '../dto/lazy-mint-nft.dto';
import { NftEntity } from '../entities/nft.entity';


@Injectable()
export class NftRepository {

  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    @InjectRepository(UserAccountEntity) private userAccountEntity: Repository<UserAccountEntity>,
    @InjectRepository(MintedNftEntity) private mintedNftEntity: Repository<MintedNftEntity>,
    @InjectRepository(NftEntity) private nftEntity: Repository<NftEntity>,
    @Inject('IPFS') private readonly ipfs: IPFSHTTPClient) { }



  async getAccountBalance(user_id: string) {
    const userAccount = await this.userAccountEntity.findOneBy({
      user_id: user_id
    });
    return userAccount.balance;

  }

  async getAccount(user_id: string) {
    const userAccount = await this.userAccountEntity.findOneBy({
      user_id: user_id
    });
    return userAccount;
  }

  async getAllOwnedTokens(userId: string) {
    const userNfts = await this.nftEntity.findOne({
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

  async getAccountAddress(user_id: string) {
    const userAccount = await this.userAccountEntity.findOneBy({
      user_id: user_id
    });
    return userAccount.public_key;

  }

  async getNftCid(user_id: string, token_id: number) {
    const userAccount = await this.userAccountEntity.findOneBy({
      user_id: user_id
    });
    return userAccount.public_key;

  }

  async insertLazyMintNft(lazyMintNftDto: LazyMintNftDto) {
    this.nftEntity.save([{
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
    return await this.nftEntity.find({
      where: {
        owner_id: ownerId,
      },
      relations: {
        ipfsEntity: true,
      }
    })
  }

  async findOneNftById(nftId: string) {
    return await this.nftEntity.findOne({
      where: {
        nft_id: nftId,
      }
    })
  }
}