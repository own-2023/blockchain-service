import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MintNftDto } from './dto/mint-nft.dto';
import { Contract } from 'web3-eth-contract';
import { IpfsService } from 'src/ipfs/ipfs.service';
import Web3 from 'web3';
import { NftRepository } from './repo/nft.repository';
import { LazyMintNftDto } from './dto/lazy-mint-nft.dto';
import { NftEntity } from './entities/nft.entity';
import { EthereumService } from 'src/ethereum/ethereum.service';

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

  async putOnSale(nft: NftEntity, newPrice: number) {
    console.log(nft);
    await this.nftRepository.setOnSale(nft, true);
    await this.nftRepository.setPrice(nft, newPrice);
    if (nft.isMinted === true) {
      await this.contract.methods.setPrice(nft.token_id, newPrice).send();
    }

    return newPrice;
  }

  async buy(nftId: string, buyerId: string,) {
    const nft = await this.nftRepository.findOneNftById(nftId);
    const buyerAccount = await this.ethereumService.getAccountBy(buyerId);
    const sellerAccount = await this.ethereumService.getAccountBy(nft.owner_id);
    let signedTransaction: any;
    if (!nft.isMinted) {
      const mintTransaction = this.contract.methods.mint(`http://127.0.0.1:8080/ipfs/${nft.ipfsEntity.cid}`, nft.ipfsEntity.nft_name, nft.price);
      signedTransaction = await this.ethereumService.signTransaction(mintTransaction, buyerAccount.private_key, buyerAccount.address);

    }
    else {
      const buyTransaction = this.contract.methods.buy(nft.token_id);
      signedTransaction = await this.ethereumService.signTransaction(buyTransaction, buyerAccount.private_key, buyerAccount.address);
    }
    try {
      await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      nft.isMinted = true;
      await this.ethereumService.withdraw(buyerId, nft.price.toString(), sellerAccount.address);
      await this.nftRepository.setOnSale(nft, false);
      await this.nftRepository.setOwnerId(nft, buyerId);
    }
    catch (err) {
      console.log(err);
      throw new InternalServerErrorException()
    }
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



  async getAllNfts() {
    let nfts: NftEntity[] = [];
    try {
      const mintedNfts = await this.contract.methods.getAllImageMetadatas().call();
      console.log(mintedNfts);
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
