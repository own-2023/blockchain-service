import { Controller, Post, Param, UseInterceptors, UploadedFile, HttpCode, UseGuards, Req, Body, Request, Get } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUsersNftMetadatasDto } from './dto/get-users-nft-metadatas.dto';
import { IpfsEntity } from './entities/ipfs.entity';
import { NftService } from 'src/nft/nft.service';

// http://localhost:8080/{cid}}

@ApiTags('ipfs')
@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) { }
  @ApiOperation({ summary: 'lazy mints an nft' })
  @ApiResponse({
    status: 201,
    type: 'file, user'
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(207)
  @UseGuards(AuthGuard)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() request: Request, @Body() body) {
    const ownerId: string = request['user'].user_id;
    this.ipfsService.uploadFile(file, ownerId, body['nftName']);
  }

  @Get('get-users-nft-metadatas')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getUsersNftMetadatas(@Req() request: Request) {
    const ownerId: string = request['user'].user_id;
    const metadatas: IpfsEntity[] = await this.ipfsService.getUsersMetadatas(ownerId);
    return metadatas.map((metadata) => {
      return {
        nftMetadataName: metadata.nft_name,
        nftMetadataPrice: metadata.price,
        nftMetadataId: metadata.id,
        nftMetadataImageUrl: this.ipfsService.getNftViewUrl(metadata.cid)
      }
    })
  }
}
