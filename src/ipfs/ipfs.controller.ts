import { Controller, Post, Param, UseInterceptors, UploadedFile, HttpCode, UseGuards, Req } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { CreateIpfDto } from './dto/create-ipf.dto';
import { UpdateIpfDto } from './dto/update-ipf.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

// http://localhost:8080/{cid}}

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) { }

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(207)
  @UseGuards(AuthGuard)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('userId') user_id: string, @Req() request: Request) {
    this.ipfsService.uploadFile(file, user_id);
  }

}
