import { Controller, Get, Post, Body, Param, HttpCode, UseGuards, Req, Put } from '@nestjs/common';
import { NftService } from './nft.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { LazyMintNftDto } from './dto/lazy-mint-nft.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { GetUserNftsResponseDto } from './dto/get-user-nfts.response.dto';
import { BuyNftDto } from './dto/buy-nft.dto';
import axios from 'axios';
import { GetOneNftByIdDto } from './dto/get-one-nft-by-id.dto';

@ApiTags('nfts')
@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) { }


  @Get('get-price/:tokenId')
  @HttpCode(200)
  async getPrice(@Param('tokenId') tokenId: string): Promise<{ price: number, tokenId: string }> {
    const price = await this.nftService.getPrice(tokenId);
    return { price, tokenId };
  }

  @ApiOperation({ summary: "buy an nft" })
  @ApiResponse({
    status: 200,
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('buy/:nftId')
  async buy(@Param('nftId') nftId: string, @Body() buyNftDto: BuyNftDto) {
    await this.nftService.buy(nftId, buyNftDto.buyerId);
  }

  @ApiOperation({ summary: "get all nfts on marketplace" })
  @ApiResponse({
    status: 200,
    description: 'all nfts fetched'
  })
  @Get('get-all-nfts')
  async getAllNfts() {
    const nfts = await this.nftService.getAllNfts();
    console.log(nfts);
    return nfts.map((nft) => {
      return {
        nftName: nft.ipfsEntity.nft_name,
        nftImageUrl: `http://127.0.0.1:8080/ipfs/${nft.ipfsEntity.cid}`,
        nftPrice: nft.price,
        nftId: nft.nft_id,
      }
    })
  }

  @Get('get-user-lazy-minted-nfts')
  @UseGuards(AuthGuard)
  async getUserLazyMintedNfts(@Req() request: Request) {
    const userId: string = request['user'].user_id;
    const result = await this.nftService.getUserLazyMintedNfts(userId);
    return result;
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

