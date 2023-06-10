import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode, UseGuards, Req, Put } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto } from './dto/mint-nft.dto';
import { SetPriceNftDto } from './dto/set-price-nft.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { LazyMintNftDto } from './dto/lazy-mint-nft.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { PutNftOnSaleDto } from './dto/put-nft-on-sale.dto';
import { BuyNftResponseDto } from './dto/buy-nft.response.dto';
import { GetUserNftsResponseDto } from './dto/get-user-nfts.response.dto';
import axios from 'axios';
import { GetOneNftByIdDto } from './dto/get-one-nft-by-id.dto';
import { AuthHomePageGuard } from 'src/auth/auth.home-page.guard';

@ApiTags('nfts')
@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) { }


  @ApiOperation({ summary: 'mints an nft' })
  @ApiResponse({
    status: 201,
    description: 'nft minted succesfully'
  })
  @Post('mint')
  async mint(@Body() mintNftDto: MintNftDto) {
    return await this.nftService.mint(mintNftDto);
  }


  @Get('get-price/:tokenId')
  @HttpCode(200)
  async getPrice(@Param('tokenId') tokenId: string): Promise<{ price: number, tokenId: string }> {
    const price = await this.nftService.getPrice(tokenId);
    return { price, tokenId };
  }

  @ApiOperation({ summary: "buy an nft" })
  @ApiResponse({
    status: 200,
    type: BuyNftResponseDto
  })
  @Post('buy/:tokenId')
  async buy(@Param('tokenId') tokenId: string): Promise<BuyNftResponseDto> {
    const price = await this.nftService.getPrice(tokenId);
    return { price, tokenId };
  }



  @ApiOperation({ summary: "get all nfts on marketplace" })
  @ApiResponse({
    status: 200,
    description: 'all nfts fetched'
  })
  @Get('get-all-nfts')
  @UseGuards(AuthHomePageGuard)
  async getAllNfts(@Req() request: Request) {
    const ownerId: string = request['user'].user_id;
    const nfts = await this.nftService.getAllNfts();
    return nfts.map((nft) => {
      return{
        nftName: nft.ipfsEntity.nft_name,
        nftImageUrl: `http://127.0.0.1:8080/ipfs/${nft.ipfsEntity.cid}`,
        nftPrice: nft.price,
        nftId: nft.nft_id,
      }
    })
  }


  @ApiOperation({ summary: "get a user's all nfts" })
  @ApiResponse({
    status: 200,
    description: "user's all nfts fetched",
    type: Array<GetUserNftsResponseDto>
  })
  @Get('get-user-nfts')
  @UseGuards(AuthGuard)
  async getNftsOwned(@Req() request: Request): Promise<GetUserNftsResponseDto[]> {
    const ownerId: string = request['user'].user_id;
    const nfts = await this.nftService.getAllNftsOwnedBy(ownerId);
    return nfts.map((nft) => {
      return {
        nftId: nft.nft_id,
        nftPrice: nft.price,
        nftImageUrl: `http://127.0.0.1:8080/ipfs/${nft.ipfsEntity.cid}`,
        nftName: nft.ipfsEntity.nft_name,
      }
    });
  }


  @Post('buy')
  async buyNft(buyerId: number, nftToken: string) {
    this.nftService.buyNft(buyerId, nftToken);
  }


  @ApiOperation({ summary: 'lazy mint an nft' })
  @ApiResponse({
    status: 201,
  })
  @Post('lazy-mint')
  @HttpCode(201)
  async lazyMintNft(@Body() LazyMintNftDto: LazyMintNftDto) {
    await this.nftService.lazyMintNft(LazyMintNftDto);
  }

  @Get(':nftId')
  @ApiOperation({ summary: "get a nft by id" })
  @ApiResponse({
    status: 200,
  })
  @HttpCode(200)
  async getOneNftById(@Param() params: any, getOneNftByIdDto: GetOneNftByIdDto) {
    const nft = await this.nftService.findOneById(params.nftId)
    let response;
    try {
      response = await axios.get('http://127.0.0.1:3000/users/username', { data: { user_id: nft.owner_id } });
    }
    catch (err) {
      console.log(err);
    }
    const username = response.data['username'];
    return {
      nftPrice: nft.price,
      nftOwner: username,
      nftName: nft.ipfsEntity.nft_name,
      nftUrl: `http://127.0.0.1:8080/ipfs/${nft.ipfsEntity.cid}`,
      nftIsOnSale: nft.isOnSale,
    }

  }


  @Put(':nftId/put-on-sale/:newPrice')
  @HttpCode(200)
  async putNftOnSale(@Param() params: any) {
    const nft = await this.nftService.findOneById(params.nft_id);
    const newPrice = await this.nftService.putOnSale(nft, params.newPrice);
    return { price: newPrice, isOnSale: true };
  }
}

