import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto, SetPriceNftDto, UploadNftDto } from './dto/nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { IpfsService } from 'src/ipfs/ipfs.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) { }

  @Post('mint')
  async mint(@Body() mintNftDto: MintNftDto) {
    return await this.nftService.mint(mintNftDto);
  }

  @Get('getPrice/:tokenId')
  async getPrice(@Param('tokenId') tokenId: number) {
    const price = await this.nftService.getPrice(tokenId);
    return { price, tokenId };
  }

  @Post('setPrice')
  async setPrice(@Body() setPriceNftDto: SetPriceNftDto) {
    await this.nftService.setPrice(setPriceNftDto.tokenId, setPriceNftDto.price);
  }

  @Post('buy/:tokenId')
  async buy(@Param('tokenId') tokenId: number) {
    const price = await this.nftService.getPrice(tokenId);
    return { price, tokenId };
  }

  @Post('createAccount/:userId')
  async createAccount(@Param('userId') userId: string) {
    return await this.nftService.createAccount(userId);
  }


  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(207)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {

  }

  @Get('getAllNfts')
  async getAllNfts() {
    return await this.nftService.getAllNfts();
  }


  // TODO: Daha uygulanıp test edilmedi, yakın zamanda yapılması lazım, kod çalışmayabilir
  // POST /nft/buy
  @Post('buy')
  async buyNft(buyerId: number, nftToken: number): Promise<any> {
    // Check if the buyer has sufficient funds
    this.nftService.buyNft(buyerId, nftToken);


  }

  // POST /nft/put-on-sale
  @Post('putOnSale')
  async putNftOnSale(tokenId: number, userId: number, price: number): Promise<boolean> {
    // Check if the token belongs to the user

    const success = await this.nftService.putNftOnSale(tokenId, userId, price);
    return success;
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
  @Post('testPost')
  async testPost() {

  }

  @Post('testGet')
  async testGet() {

  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNftDto: UpdateNftDto) {
    return this.nftService.update(+id, updateNftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nftService.remove(+id);
  }
}
