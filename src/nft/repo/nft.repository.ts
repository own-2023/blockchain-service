import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { IpfsEntity } from 'src/ipfs/entities/ipf.entity';
import { Repository } from 'typeorm';
import { UserAccountEntity } from '../entities/user-account.entity';
import { UserEntity } from '../entities/user.entity';
import { UserNftEntity } from '../entities/user-nft.entity';
import { MintNftDto } from '../dto/nft.dto';
import { IPFSHTTPClient } from 'ipfs-http-client';


@Injectable()
export class NftRepository {

  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    @InjectRepository(UserAccountEntity) private userAccountEntity: Repository<UserAccountEntity>,
    @InjectRepository(UserNftEntity) private userNftEntity: Repository<UserNftEntity>,
    @Inject('IPFS') private readonly ipfs: IPFSHTTPClient) { }



  async uploadNft(user_id: number, file: Express.Multer.File) {
    return 'This action adds a new ethTransaction';
  }

  async getAccountBalance(user_id: number) {
    const userAccount = await this.userAccountEntity.findOneBy({
      user_id: user_id
    });
    return userAccount.balance;

  }

  async getAccount(user_id: number) {
    const userAccount = await this.userAccountEntity.findOneBy({
      user_id: user_id
    });
    return userAccount;
  }

  async getAllOwnedTokens(user_id: number) {
    const userNfts = await this.userNftEntity.findOneBy({
      user_id: user_id
    });
    return userNfts;
  }

  async getOwnedNftByTokenId(token_id: number) {
    const userNfts = await this.userNftEntity.findOneBy({
      token_id: token_id
    });
    return userNfts;
  }

  async getAccountAddress(user_id: number) {
    const userAccount = await this.userAccountEntity.findOneBy({
      user_id: user_id
    });
    return userAccount.public_key;

  }

  async getNftCid(user_id: number, token_id: number) {
    const userAccount = await this.userAccountEntity.findOneBy({
      user_id: user_id
    });
    return userAccount.public_key;

  }


  async insertNft(mintNftDto: MintNftDto, token_id: number) {
    const mintedNft = new UserNftEntity();
    mintedNft.name = mintNftDto.name;
    mintedNft.user_id = mintNftDto.userId;
    mintedNft.token_id = token_id;
    mintedNft.price = mintNftDto.price;
    mintedNft.created_at = new Date();
    mintedNft.updated_at = new Date();
    console.log(mintedNft);
    await this.userNftEntity.save([mintedNft]);
  }

  async buyNft(user_id: number, tokenId: number) {
    const usernft = await this.userNftEntity.findOneBy({
      user_id: user_id,
      token_id: tokenId
    });

    usernft.price = 0;
    const result = await this.userNftEntity.save(usernft);
    return result;

  }

  async putOnSaleNft(tokenId: number, userId: number, price: number) {
    return 'This action adds a new ethTransaction';
  }

  async getUserOwnedNfts(user_id: number) {
    return 'This action adds a new ethTransaction';
  }

  async getAllNft() {
    return 'This action adds a new ethTransaction';
  }

  async getOnSaleNft() {
    return 'This action adds a new ethTransaction';
  }




}