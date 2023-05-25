import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode, UseGuards, Req } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto } from './dto/mint-nft.dto';
import { SetPriceNftDto } from './dto/set-price-nft.dto';
import { UploadNftDto } from './dto/upload-nft-dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { LazyMintNftDto } from './dto/lazy-mint-nft.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('nfts')
@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) { }

  @ApiOperation({summary: 'mints an nft'})
  @ApiResponse({
    status: 204,
    type: MintNftDto
  })
  @Post('mint')
  async mint(@Body() mintNftDto: MintNftDto) {
    return await this.nftService.mint(mintNftDto);
  }

  @ApiOperation({summary: "get nft's price"})
  @ApiResponse({
    status: 200,
  })
  @Get('get-price/:tokenId')
  async getPrice(@Param('tokenId') tokenId: number) {
    const price = await this.nftService.getPrice(tokenId);
    return { price, tokenId };
  }


  @ApiOperation({summary: "set nft's price"})
  @ApiResponse({
    status: 204,
  })
  @Post('setPrice')
  async setPrice(@Body() setPriceNftDto: SetPriceNftDto) {
    await this.nftService.setPrice(setPriceNftDto.tokenId, setPriceNftDto.price);
  }


  @ApiOperation({summary: "buy an nft"})
  @ApiResponse({
    status: 204,
  })
  @Post('buy/:tokenId')
  async buy(@Param('tokenId') tokenId: number) {
    const price = await this.nftService.getPrice(tokenId);
    return { price, tokenId };
  }


  
  @ApiOperation({summary: "get all nfts on marketplace"})
  @ApiResponse({
    status: 200,
  })
  @Get('get-all-nfts')
  async getAllNfts() {
    return await this.nftService.getAllNfts();
  }


  @ApiOperation({summary: "get a user's all nfts"})
  @ApiResponse({
    status: 200,
  })
  @Get('get-user-nfts')
  @UseGuards(AuthGuard)
  async getNftsOwned(@Req() request: Request) {
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



  // TODO: Daha uygulanıp test edilmedi, yakın zamanda yapılması lazım, kod çalışmayabilir
  // POST /nft/buy
  @Post('buy')
  async buyNft(buyerId: number, nftToken: number): Promise<any> {
    // Check if the buyer has sufficient funds
    this.nftService.buyNft(buyerId, nftToken);
  }

  // POST /nfts/put-on-sale
  @Post('put-on-sale')
  async putNftOnSale(tokenId: number, userId: number, price: number): Promise<boolean> {
    // Check if the token belongs to the user

    const success = await this.nftService.putNftOnSale(tokenId, userId, price);
    return success;
  }

  @Post('lazy-mint')
  @HttpCode(204)
  async lazyMintNft(@Body() LazyMintNftDto: LazyMintNftDto) {

    await this.nftService.lazyMintNft(LazyMintNftDto);
  }

  /*
  @Post('generateWalletWeb3/:userId')
  async generateWalletWeb3(@Param('userId') userId: string) {
    return await this.nftService.generateWalletWeb3(userId);
  }

  @Post('addWalletToAccount')
  async addWalletToAccount(@Param('userId') userId: string) {
    return await this.nftService.generateWalletWeb3(userId);
  }

  @Post('getAccount')
  async getAccount(@Param('userId') userId: string) {
    return await this.nftService.generateWalletWeb3(userId);
  }
*/

@Get(':id')
@ApiOperation({summary: "get a nft by id"})
  @ApiResponse({
    status: 200,
  })
@HttpCode(200)
async getOneNftById(nftId: string){
  const nft = await this.nftService.findOneByNft(nftId)
}
}
