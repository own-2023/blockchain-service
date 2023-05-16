import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto, SetPriceNftDto } from './dto/nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post('mint')
  mint(@Body() mintNftDto: MintNftDto) {
    return this.nftService.mint(mintNftDto);
  }

  @Get('getPrice/:tokenId')
  async getPrice(@Param('tokenId') tokenId: number) {
    const price = await this.nftService.getPrice(tokenId);
    return  {price, tokenId};
  }

  @Post('setPrice')
  async setPrice(@Body() setPriceNftDto: SetPriceNftDto) {
    await this.nftService.setPrice(setPriceNftDto.tokenId, setPriceNftDto.price);
  }

  @Post('buy/:tokenId')
  async buy(@Param('tokenId') tokenId: number) {
    const price = await this.nftService.getPrice(tokenId);
    return  {price, tokenId};
  }

  @Post('createAccount/:userId')
  async createAccount(@Param('userId') userId: string) {
    return await this.nftService.createAccount(userId);
  }

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

  @Post('testPost')
  async testPost() {
    
  }

  @Post('testGet')
  async testGet() {
    
  }


  @Get()
  findAll() {
    return this.nftService.findAll();
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
